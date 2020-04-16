// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SearchView } from './views/SearchView';
import { ResultsView } from './views/ResultsView';
import { PromptForSearchCommand } from './commands/PromptForSearchCommand';
import { SearchCommand } from './commands/SearchCommand';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider('ast-query.search', new SearchView()),
    vscode.window.registerTreeDataProvider('ast-query.results', new ResultsView()),

    new PromptForSearchCommand(),
    new SearchCommand(),
  );

  // TODO: debug only
  vscode.window.showInformationMessage('Hello World from ast-query!');
  vscode.commands.executeCommand(SearchCommand.key, 'IfStatement');
}

// this method is called when your extension is deactivated
export function deactivate() { }
