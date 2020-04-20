import { ProviderResult } from "vscode";
import { TreeNode } from "./common";
import { BaseView } from "./BaseView";

class SearchMenuNode extends TreeNode {
}

export class SearchView extends BaseView<SearchMenuNode> {
  protected getRootChildren(): ProviderResult<SearchMenuNode[]> {
    return [
      new SearchMenuNode('Search all files'),
      new SearchMenuNode('Search current file')
    ];
  }
}
