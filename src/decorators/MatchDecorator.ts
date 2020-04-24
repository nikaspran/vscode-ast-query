import { Disposable, window, ThemeColor, DecorationOptions } from "vscode";
import { SearchResultsByFilePath, rangeFor } from "../common";
import { Container } from "../Container";
import { Node } from "estree";

export class MatchDecorator implements Disposable {
  private disposables: Disposable[] = [];
  private results?: SearchResultsByFilePath;

  private focusedMatchDecorationType = window.createTextEditorDecorationType({
    backgroundColor: new ThemeColor('editor.findMatchBackground'),
  });
  private matchDecorationType = window.createTextEditorDecorationType({
    backgroundColor: new ThemeColor('editor.findMatchHighlightBackground'),
  });

  constructor() {
    this.disposables.push(
      window.onDidChangeActiveTextEditor(() => this.updateDecorators()),
      Container.resultsView.onDidChangeVisibility(() => this.updateDecorators()),
      Container.resultsView.onSelectMatch(() => this.updateDecorators()),
      // TODO: workspace.onDidChangeTextDocument - on change contents, rerun search for file
    );
  }

  private decorate(matches: Node[], { focusedMatch }: { focusedMatch?: Node }) {
    const { activeTextEditor } = window;
    if (!activeTextEditor) {
      return;
    }

    const otherMatches = matches.filter(match => match !== focusedMatch);
    activeTextEditor.setDecorations(this.matchDecorationType, otherMatches.map(rangeFor));
    activeTextEditor.setDecorations(this.focusedMatchDecorationType, focusedMatch ? [rangeFor(focusedMatch)] : []);
  }

  private updateDecorators() {
    const { activeTextEditor } = window;

    if (!Container.resultsView.isVisible()) {
      this.decorate([], { focusedMatch: undefined });
      return;
    }

    const documentResults = this.results && activeTextEditor && this.results[activeTextEditor.document.uri.path];
    if (!documentResults) {
      return;
    }

    this.decorate(documentResults.matches, { focusedMatch: Container.resultsView.getSelectedMatch() });
  }

  highlight(results: SearchResultsByFilePath) {
    this.results = results;
    this.updateDecorators();
  }

  dispose() {
    return Disposable.from(...this.disposables).dispose();
  }
}
