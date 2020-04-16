import { Disposable, commands, window } from "vscode";
import { SearchCommand } from "./SearchCommand";

export class PromptForSearchCommand implements Disposable {
  public static key = 'ast-query.promptForSearch';

  private disposable: Disposable;

  constructor() {
    this.disposable = commands.registerCommand(PromptForSearchCommand.key, async () => {
      const result = await window.showInputBox();
      if (!result) {
        return;
      }

      await commands.executeCommand(SearchCommand.key, result);
    });
  }

  dispose() {
    return this.disposable.dispose();
  }
}
