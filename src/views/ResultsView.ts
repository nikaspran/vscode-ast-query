import { ProviderResult, Uri, EventEmitter, TreeItem, TreeItemCollapsibleState, ThemeIcon, TreeViewVisibilityChangeEvent, window, Disposable, TreeView, TreeViewSelectionChangeEvent } from "vscode";
import { Node } from 'estree';
import { TreeNode } from "./common";
import { BaseView } from "./BaseView";
import { SearchResult, SearchResultsByFilePath } from "../common";
import { OpenMatchCommand } from "../commands/OpenMatchCommand";

class NoResultsFound extends TreeNode {
  constructor() {
    super('No results found');
  }
}

class MatchNode extends TreeNode {
  constructor(private match: Node, private searchResult: SearchResult) {
    super(searchResult.fileContents.substr(match.range![0], match.range![1]));
  }

  getTreeItem(): TreeItem {
    const item = new TreeItem(this.message, TreeItemCollapsibleState.None);
    item.command = {
      title: 'Open file',
      command: OpenMatchCommand.key,
      arguments: [
        this.searchResult.file,
        this.match,
      ]
    };
    return item;
  }

  getMatch() {
    return this.match;
  }
}

class FileNode extends TreeNode {
  private searchResult: SearchResult;

  constructor(searchResult: SearchResult) {
    const filename = searchResult.file.fsPath.split('/').pop() as string;
    super(filename);
    this.searchResult = searchResult;
  }

  getTreeItem(): TreeItem {
    const item = new TreeItem(this.message, TreeItemCollapsibleState.Expanded);
    item.resourceUri = this.searchResult.file;
    item.iconPath = ThemeIcon.File;
    return item;
  }

  getChildren() {
    return this.searchResult.matches.map(match => new MatchNode(match, this.searchResult));
  }
}

export class ResultsView extends BaseView<TreeNode> implements Disposable {
  private selectedMatch?: Node;

  private results?: SearchResult[];
  private disposables: Disposable[] = [];

  private changeSelectionEmitter = new EventEmitter<Node>();

  constructor() {
    super();
    this.disposables.push(
      this.changeSelectionEmitter,
      this.tree.onDidChangeSelection(this.notifyAboutSelectedMatch, this),
      this.onSelectMatch((node) => this.selectedMatch = node)
    );
  }

  protected getId() {
    return 'ast-query.results';
  }

  protected getRootChildren(): ProviderResult<TreeNode[]> {
    if (!this.results) {
      return [];
    }

    if (!this.results.length) {
      return [new NoResultsFound()];
    }

    return this.results.map(result => new FileNode(result));
  }

  private notifyAboutSelectedMatch(event: TreeViewSelectionChangeEvent<TreeNode>) {
    const [selected] = event.selection;
    this.changeSelectionEmitter.fire(selected instanceof MatchNode ? selected.getMatch() : undefined);
  }

  getSelectedMatch() {
    return this.selectedMatch;
  }

  onSelectMatch(listener: (node: Node) => any) {
    return this.changeSelectionEmitter.event(listener);
  }

  show(results: SearchResultsByFilePath) {
    this.results = Object.values(results);
    this.selectedMatch = undefined;
    this.fireChangeEvent();
  }

  dispose() {
    Disposable.from(...this.disposables).dispose();
    super.dispose();
  }
}
