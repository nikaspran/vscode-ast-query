import { Disposable, commands } from 'vscode';
import { SearchQuery } from '../views/SearchHistoryView';
import { SearchCommand } from './SearchCommand';
import { SearchScope } from '../common';

export class SearchGlobalCommand implements Disposable {
  public static key = 'ast-query.searchGlobal';

  private disposable: Disposable;

  constructor() {
    this.disposable = commands.registerCommand(SearchGlobalCommand.key, async ({
      search,
    }: {
      search: SearchQuery;
    }) => {
      await commands.executeCommand(SearchCommand.key, search.query, {
        scope: SearchScope.global,
      });
    });
  }

  dispose() {
    return this.disposable.dispose();
  }
}
