import { Disposable, commands, window, Task, workspace, CustomExecution, Pseudoterminal, Event, EventEmitter, TerminalDimensions, Uri } from 'vscode';
import * as esquery from 'esquery';
import { parse } from '@typescript-eslint/typescript-estree';
import { Node } from 'estree';
import { Container } from '../Container';
import { ShowSearchResultsCommand } from './ShowSearchResultsCommand';
import { SearchResultsByFilePath } from '../common';

async function findMatches(files: Uri[], query: string): Promise<SearchResultsByFilePath> {
  const results = await Promise.all(files.map(async (file) => {
    const contents = (await workspace.fs.readFile(file)).toString();
    const ast = parse(contents);
    const matches = esquery.query(ast as Node, query);

    return {
      file,
      fileContents: contents,
      matches,
    };
  }));

  return results
    .filter(result => result.matches.length > 0)
    .reduce((results, current) => ({
      ...results,
      [current.file.path]: current,
    }), {});
}

export class SearchCommand implements Disposable {
  public static key = 'ast-query.search';

  private disposable: Disposable;

  constructor() {
    this.disposable = commands.registerCommand(SearchCommand.key, async (query) => {
      const allFiles = await workspace.findFiles('**/*.{js,ts}', '**/node_modules/**');
      const results = await findMatches(allFiles, query);

      Container.resultsView.show(results);
      Container.matchHighlightProvider.highlight(results);
      await commands.executeCommand(ShowSearchResultsCommand.key);
    });
  }

  dispose() {
    return this.disposable.dispose();
  }
}
