import { Disposable, window, ThemeColor, DecorationOptions } from "vscode";
import { SearchResultsByFilePath, rangeFor } from "../common";
import { Container } from "../Container";

export class MatchDecorator implements Disposable {
  private disposables: Disposable[] = [];
  private results?: SearchResultsByFilePath;
  private decorationType = window.createTextEditorDecorationType({
    backgroundColor: new ThemeColor('editor.findMatchHighlightBackground'),
  });

  constructor() {
    this.disposables.push(
      window.onDidChangeActiveTextEditor(() => this.updateDecorators()),
      Container.resultsView.onDidChangeVisibility(() => this.updateDecorators()),
      // TODO: workspace.onDidChangeTextDocument - on change contents, rerun search for file
    );
  }

  private setDecorations(decorations: DecorationOptions[]) {
    const { activeTextEditor } = window;
    if (activeTextEditor) {
      activeTextEditor.setDecorations(this.decorationType, decorations);
    }
  }

  private updateDecorators() {
    const { activeTextEditor } = window;

    if (!Container.resultsView.isVisible()) {
      this.setDecorations([]);
      return;
    }

    const documentResults = this.results && activeTextEditor && this.results[activeTextEditor.document.uri.path];
    if (!documentResults) {
      return;
    }

    const decorations = documentResults.matches.map(match => ({
      range: rangeFor(match),
    }));

    this.setDecorations(decorations);
  }

  highlight(results: SearchResultsByFilePath) {
    this.results = results;
    this.updateDecorators();
  }

  dispose() {
    return Disposable.from(...this.disposables).dispose();
  }
}
