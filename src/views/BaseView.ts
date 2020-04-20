import { TreeDataProvider, TreeItem, ProviderResult } from "vscode";
import { TreeNode, isRoot } from "./common";

export abstract class BaseView<NodeType extends TreeNode> implements TreeDataProvider<NodeType> {
  protected abstract getRootChildren(): ProviderResult<NodeType[]>;

  protected getChildrenOf(element: NodeType): ProviderResult<NodeType[]> {
    return element.getChildren() as NodeType[];
  };

  getChildren(element?: NodeType): ProviderResult<NodeType[]> {
    return isRoot(element) ? this.getRootChildren() : this.getChildrenOf(element);
  }

  getTreeItem(element: NodeType): TreeItem | Thenable<TreeItem> {
    return element.getTreeItem();
  }
}
