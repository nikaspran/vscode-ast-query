import { ProviderResult, TreeItem, TreeItemCollapsibleState, Command } from "vscode";
import { TreeNode } from "./common";
import { BaseView } from "./BaseView";
import { PromptForSearchCommand } from "../commands/PromptForSearchCommand";
import { SearchScope } from "../common";

class SearchMenuNode extends TreeNode {
  constructor(message: string, private command: Command) {
    super(message);
  }

  getTreeItem(): TreeItem {
    const item = new TreeItem(this.message, TreeItemCollapsibleState.None);
    item.command = this.command;
    return item;
  }
}

export class SearchView extends BaseView<SearchMenuNode> {
  protected getId() {
    return 'ast-query.search';
  }

  protected getRootChildren(): ProviderResult<SearchMenuNode[]> {
    return [
      new SearchMenuNode('Search all files', {
        title: 'Search all files',
        command: PromptForSearchCommand.key,
        arguments: [
          { scope: SearchScope.global },
        ]
      }),
      new SearchMenuNode('Search active file', {
        title: 'Search active file',
        command: PromptForSearchCommand.key,
        arguments: [
          { scope: SearchScope.activeFile },
        ]
      })
    ];
  }
}
