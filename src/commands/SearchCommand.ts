import { Disposable, commands, window, Task, workspace, CustomExecution, Pseudoterminal, Event, EventEmitter, TerminalDimensions } from 'vscode';
import * as esquery from 'esquery';

class SearchRunner implements Pseudoterminal {
  private writeEmitter: EventEmitter<string>;

  onDidWrite: Event<string>;
  onDidOverrideDimensions?: Event<TerminalDimensions | undefined> | undefined;
  onDidClose?: Event<number | void> | undefined;

  constructor(private query: string) {
    this.writeEmitter = new EventEmitter<string>();
    this.onDidWrite = this.writeEmitter.event;
  }

  open(initialDimensions: TerminalDimensions | undefined): void {
    console.log('open ' + this.query);
  }
  close(): void {
    console.log('close ' + this.query);
  }
}

export class SearchCommand implements Disposable {
  public static key = 'ast-query.search';

  private disposable: Disposable;

  constructor() {
    this.disposable = commands.registerCommand(SearchCommand.key, async (query) => {
      // new Task(
      //   { type: 'ast-query.search' },
      //   workspace.workspaceFolders[0],
      //   'Search AST',
      //   'ast-query',
      //   new CustomExecution(async () => new SearchRunner(query))
      // );

      const allFiles = await workspace.findFiles('**/*.{js,ts}', '**/node_modules/**');
      console.log(allFiles);
    });
  }

  dispose() {
    return this.disposable.dispose();
  }
}
