import { Disposable, commands } from "vscode";

export class ShowSearchResultsCommand implements Disposable {
  public static key = 'ast-query.showSearchResults';

  private disposable: Disposable;

  constructor() {
    this.disposable = commands.registerCommand(ShowSearchResultsCommand.key, async () => {
      await commands.executeCommand('ast-query.results.focus');
    });
  }

  dispose() {
    return this.disposable.dispose();
  }
}
