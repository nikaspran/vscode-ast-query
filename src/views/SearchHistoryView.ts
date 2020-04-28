/* eslint-disable max-classes-per-file */
import { ProviderResult, TreeItem, TreeItemCollapsibleState } from 'vscode';
import { TreeNode } from './common';
import { BaseView } from './BaseView';
import { SearchScope } from '../common';
import { SearchCommand } from '../commands/SearchCommand';

interface SearchQuery {
  query: string;
  scope?: SearchScope;
}

class SearchHistoryNode extends TreeNode {
  constructor(private search: SearchQuery) {
    super(search.query);
  }

  getTreeItem(): TreeItem {
    const item = new TreeItem(this.message, TreeItemCollapsibleState.None);
    item.command = {
      title: this.search.query,
      command: SearchCommand.key,
      arguments: [
        this.search.query,
      ],
    };
    return item;
  }
}

export class SearchHistoryView extends BaseView<SearchHistoryNode> {
  private searchHistory: { query: string; scope?: SearchScope }[] = [];

  protected getId() {
    return 'ast-query.searchHistory';
  }

  protected getRootChildren(): ProviderResult<SearchHistoryNode[]> {
    return this.searchHistory.map((item) => new SearchHistoryNode(item));
  }

  push({ query, scope }: SearchQuery) {
    if (this.searchHistory[0]?.query === query) {
      return;
    }

    this.searchHistory.unshift({ query, scope });
    this.fireChangeEvent();
  }
}
