import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, ProviderResult, Event } from "vscode";

interface ResultsItem {
  getTreeItem(): TreeItem;
}

class ResultsItem {
  constructor(
    private message: string
  ) {}
}

export class ResultsView implements TreeDataProvider<ResultsItem> {
  onDidChangeTreeData?: Event<ResultsItem | null | undefined> | undefined;

  getTreeItem(element: ResultsItem): TreeItem | Thenable<TreeItem> {
    return element.getTreeItem();
  }

  getChildren(element?: ResultsItem | undefined): ProviderResult<ResultsItem[]> {
    if (!element) {
      return [];
    }
    return [];
  }
}
