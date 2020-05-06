/* eslint-disable max-classes-per-file */
import { ProviderResult, TreeItem, TreeItemCollapsibleState } from 'vscode';
import { TreeNode } from './common';
import { BaseView } from './BaseView';
import { SearchScope } from '../common';
import { SearchCommand } from '../commands/SearchCommand';

const MAX_HISTORY_LENGTH = 10;

export interface SearchQuery {
  query: string;
  scope?: SearchScope;
}

class SearchHistoryNode extends TreeNode {
  constructor(private search: SearchQuery) {
    super(search.query);
  }

  getTreeItem(): TreeItem {
    const item = new TreeItem(this.message, TreeItemCollapsibleState.None);
    item.description = this.search.scope === SearchScope.global ? '(all files)' : '(active file)';
    item.command = {
      title: this.search.query,
      command: SearchCommand.key,
      arguments: [
        this.search.query,
        { scope: this.search.scope },
      ],
    };
    return item;
  }
}

export class SearchHistoryView extends BaseView<SearchHistoryNode> {
  private searchHistory: SearchQuery[] = [];

  protected getId() {
    return 'ast-query.searchHistory';
  }

  protected getRootChildren(): ProviderResult<SearchHistoryNode[]> {
    return this.searchHistory.map((item) => new SearchHistoryNode(item));
  }

  push({ query, scope }: SearchQuery) {
    if (this.searchHistory.find((item) => item.query === query)) {
      return;
    }

    this.searchHistory.unshift({ query, scope });

    if (this.searchHistory.length > MAX_HISTORY_LENGTH) {
      this.searchHistory.pop();
    }

    this.fireChangeEvent();
  }
}
