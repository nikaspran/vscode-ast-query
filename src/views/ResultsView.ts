import { ProviderResult, Uri, EventEmitter, TreeItem, TreeItemCollapsibleState, ThemeIcon, TreeViewVisibilityChangeEvent, window, Disposable, TreeView } from "vscode";
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
  private results?: SearchResult[];

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

  show(results: SearchResultsByFilePath) {
    this.results = Object.values(results);
    this.fireChangeEvent();
  }
}
