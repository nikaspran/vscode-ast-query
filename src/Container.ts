import * as vscode from 'vscode';
import { SearchView } from './views/SearchView';
import { ResultsView } from './views/ResultsView';
import { PromptForSearchCommand } from './commands/PromptForSearchCommand';
import { SearchCommand } from './commands/SearchCommand';
import { ShowSearchResultsCommand } from './commands/ShowSearchResultsCommand';
import { OpenMatchCommand } from './commands/OpenMatchCommand';
import { MatchDecorator } from './decorators/MatchDecorator';
import { SearchHistoryView } from './views/SearchHistoryView';
import { SearchActiveCommand } from './commands/SearchActiveCommand';
import { SearchGlobalCommand } from './commands/SearchGlobalCommand';

export class Container {
  static init(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      this.searchView,
      this.searchHistoryView,
      this.resultsView,

      new PromptForSearchCommand(),
      new SearchCommand(),
      new SearchActiveCommand(),
      new SearchGlobalCommand(),
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

  private static searchHistoryViewInstance: SearchHistoryView;
  static get searchHistoryView() {
    this.searchHistoryViewInstance = this.searchHistoryViewInstance || new SearchHistoryView();
    return this.searchHistoryViewInstance;
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
