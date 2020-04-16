import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, ProviderResult, Event } from "vscode";

class SearchItem {
  constructor(
    private message: string
  ) {}

  getTreeItem(): TreeItem {
    const item = new TreeItem(this.message, TreeItemCollapsibleState.None);
    // item.contextValue = ResourceType.Message;
    // item.description = this._description;
    // item.tooltip = this._tooltip;
    // item.iconPath = this._iconPath;
    return item;
  }
}

export class SearchView implements TreeDataProvider<SearchItem> {
  onDidChangeTreeData?: Event<SearchItem | null | undefined> | undefined;

  getTreeItem(element: SearchItem): TreeItem | Thenable<TreeItem> {
    return element.getTreeItem();
  }

  getChildren(element?: SearchItem | undefined): ProviderResult<SearchItem[]> {
    if (!element) {
      return [
        new SearchItem('Search all files'),
        new SearchItem('Search current file')
      ];
    }
    return [];
  }
}
