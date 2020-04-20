import * as vscode from 'vscode';
import { SearchView } from './views/SearchView';
import { ResultsView } from './views/ResultsView';
import { PromptForSearchCommand } from './commands/PromptForSearchCommand';
import { SearchCommand } from './commands/SearchCommand';
import { ShowSearchResultsCommand } from './commands/ShowSearchResultsCommand';
import { OpenMatchCommand } from './commands/OpenMatchCommand';
import { MatchDecorator } from './decorators/MatchDecorator';

export class Container {
  static init(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.window.registerTreeDataProvider('ast-query.search', this.searchView),
      vscode.window.registerTreeDataProvider('ast-query.results', this.resultsView),

      new PromptForSearchCommand(),
      new SearchCommand(),
      new ShowSearchResultsCommand(),
      new OpenMatchCommand(),

      this.matchDecoratorInstance,
    );

    // TODO: debug only
    vscode.commands.executeCommand(SearchCommand.key, 'IfStatement');
  }

  private static searchViewInstance: SearchView;
  static get searchView() {
    this.searchViewInstance = this.searchViewInstance || new SearchView();
    return this.searchViewInstance;
  }

  private static resultsViewInstance: ResultsView;
  static get resultsView() {
    this.resultsViewInstance = this.resultsViewInstance || new ResultsView();
    return this.resultsViewInstance;
  }

  private static matchDecoratorInstance: MatchDecorator;
  static get matchHighlightProvider() {
    this.matchDecoratorInstance = this.matchDecoratorInstance || new MatchDecorator();
    return this.matchDecoratorInstance;
  }
}
