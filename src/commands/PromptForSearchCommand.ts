import { Disposable, commands, window } from 'vscode';
import { SearchCommand } from './SearchCommand';
import { SearchScope } from '../common';

export class PromptForSearchCommand implements Disposable {
  public static key = 'ast-query.promptForSearch';

  private disposable: Disposable;

  constructor() {
    this.disposable = commands.registerCommand(PromptForSearchCommand.key, async ({
      scope,
    }: {
      scope: SearchScope;
    }) => {
      const result = await window.showInputBox({
        prompt: `Search ${scope === SearchScope.global ? 'all files' : 'active file'}`,
      });
      if (!result) {
        return;
      }

      await commands.executeCommand(SearchCommand.key, result, {
        scope,
      });
    });
  }

  dispose() {
    return this.disposable.dispose();
  }
}
