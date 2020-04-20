import { Disposable, window, ThemeColor } from "vscode";
import { SearchResultsByFilePath, rangeFor } from "../common";

export class MatchDecorator implements Disposable {
  private disposables: Disposable[] = [];
  private results?: SearchResultsByFilePath;
  private decorationType = window.createTextEditorDecorationType({
    backgroundColor: new ThemeColor('editor.findMatchHighlightBackground'),
  });

  constructor() {
    this.disposables.push(
      window.onDidChangeActiveTextEditor(() => this.updateDecorators()),
      // TODO: display only when the AST query extension is active
      // TODO: workspace.onDidChangeTextDocument - on change contents, rerun search for file
    );
  }

  private updateDecorators() {
    const { activeTextEditor } = window;

    const documentResults = this.results && activeTextEditor && this.results[activeTextEditor.document.uri.path];
    if (!documentResults) {
      return;
    }

    const decorations = documentResults.matches.map(match => ({
      range: rangeFor(match),
    }));

    activeTextEditor!.setDecorations(this.decorationType, decorations);
  }

  highlight(results: SearchResultsByFilePath) {
    this.results = results;
    this.updateDecorators();
  }

  dispose() {
    return Disposable.from(...this.disposables).dispose();
  }
}
