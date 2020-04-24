import {
  TreeDataProvider,
  TreeItem,
  ProviderResult,
  Disposable,
  TreeView,
  window,
  TreeViewVisibilityChangeEvent,
  EventEmitter,
} from 'vscode';
import { TreeNode, isRoot } from './common';

export abstract class BaseView<NodeType extends TreeNode> implements TreeDataProvider<NodeType>, Disposable {
  private changeEventEmitter = new EventEmitter<NodeType>();

  get onDidChangeTreeData() {
    return this.changeEventEmitter.event;
  }

  protected fireChangeEvent(node?: NodeType) {
    this.changeEventEmitter.fire(node);
  }

  protected abstract getId(): string;

  protected abstract getRootChildren(): ProviderResult<NodeType[]>;

  protected getChildrenOf(element: NodeType): ProviderResult<NodeType[]> {
    return element.getChildren() as NodeType[];
  }

  protected tree: TreeView<NodeType>;

  constructor() {
    this.tree = window.createTreeView(this.getId(), {
      treeDataProvider: this,
    });
  }

  getChildren(element?: NodeType): ProviderResult<NodeType[]> {
    return isRoot(element) ? this.getRootChildren() : this.getChildrenOf(element);
  }

  getTreeItem(element: NodeType): TreeItem | Thenable<TreeItem> {
    return element.getTreeItem();
  }

  onDidChangeVisibility(listener: (e: TreeViewVisibilityChangeEvent) => unknown) {
    return this.tree.onDidChangeVisibility(listener);
  }

  isVisible() {
    return this.tree.visible;
  }

  dispose() {
    return this.tree.dispose();
  }
}
