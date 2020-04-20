import { ProviderResult, Uri, EventEmitter, TreeItem, TreeItemCollapsibleState, ThemeIcon } from "vscode";
import { Node } from 'estree';
import { TreeNode } from "./common";
import { BaseView } from "./BaseView";
import { SearchResult, SearchResultsByFilePath } from "../common";
import { OpenMatchCommand } from "../commands/OpenMatchCommand";

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

export class ResultsView extends BaseView<TreeNode> {
  private changeEventEmitter = new EventEmitter<TreeNode>();
  onDidChangeTreeData = this.changeEventEmitter.event;

  private results?: SearchResult[];

  protected getRootChildren(): ProviderResult<TreeNode[]> {
    if (!this.results) {
      return [];
    }

    return this.results.map(result => new FileNode(result));
  }

  show(results: SearchResultsByFilePath) {
    this.results = Object.values(results);
    this.refreshEntireTree();
  }

  private refreshEntireTree = () => this.changeEventEmitter.fire(undefined);
}
