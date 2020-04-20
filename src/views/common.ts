import { TreeItem, TreeItemCollapsibleState } from "vscode";

export class TreeNode {
  constructor(
    protected message: string,
  ) {}

  getTreeItem(): TreeItem {
    const item = new TreeItem(this.message, TreeItemCollapsibleState.None);
    // item.contextValue = ResourceType.Message;
    // item.description = this._description;
    // item.tooltip = this._tooltip;
    // item.iconPath = this._iconPath;
    return item;
  }

  getChildren(): TreeNode[] {
    return [];
  }
}

export function isRoot(node?: TreeNode): node is undefined {
  return !node;
};
