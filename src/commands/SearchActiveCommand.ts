import { Disposable, commands } from 'vscode';
import { SearchQuery } from '../views/SearchHistoryView';
import { SearchCommand } from './SearchCommand';
import { SearchScope } from '../common';

export class SearchActiveCommand implements Disposable {
  public static key = 'ast-query.searchActive';

  private disposable: Disposable;

  constructor() {
    this.disposable = commands.registerCommand(SearchActiveCommand.key, async ({
      search,
    }: {
      search: SearchQuery;
    }) => {
      await commands.executeCommand(SearchCommand.key, search.query, {
        scope: SearchScope.activeFile,
      });
    });
  }

  dispose() {
    return this.disposable.dispose();
  }
}
