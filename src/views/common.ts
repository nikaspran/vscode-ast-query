import { TreeItem, TreeItemCollapsibleState } from 'vscode';

export class TreeNode {
  constructor(
    protected message: string,
  ) {}

  getTreeItem(): TreeItem {
    return new TreeItem(this.message, TreeItemCollapsibleState.None);
  }

  getChildren(): TreeNode[] {
    return [];
  }
}

export function isRoot(node?: TreeNode): node is undefined {
  return !node;
}
