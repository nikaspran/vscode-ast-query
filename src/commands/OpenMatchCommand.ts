import { Disposable, commands, window, Uri, TextEditorRevealType } from "vscode";
import { Node } from "estree";
import { rangeFor } from "../common";

export class OpenMatchCommand implements Disposable {
  public static key = 'ast-query.openMatch';

  private disposable: Disposable;

  constructor() {
    this.disposable = commands.registerCommand(OpenMatchCommand.key, async (file: Uri, match: Node) => {
      const textEditor = await window.showTextDocument(file);
      textEditor.revealRange(rangeFor(match), TextEditorRevealType.Default);
    });
  }

  dispose() {
    return this.disposable.dispose();
  }
}
