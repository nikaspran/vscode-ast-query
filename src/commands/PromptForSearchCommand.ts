/* eslint-disable max-classes-per-file */
import { Disposable, commands, QuickPickItem } from 'vscode';
import { SearchCommand } from './SearchCommand';
import { SearchScope } from '../common';
import { showQuickPick } from '../utils/QuickPick';

const supportedSelectors = [
  { type: 'AST node type', example: 'ForStatement' },
  { type: 'wildcard', example: '*' },
  { type: 'attribute existence', example: '[attr]' },
  { type: 'attribute value', example: '[attr="foo"] or [attr=123]' },
  { type: 'attribute regex', example: '[attr=/foo.*/] or (with flags) [attr=/foo.*/is]' },
  { type: 'attribute conditions', example: '[attr!="foo"], [attr>2], [attr<3], [attr>=2], or [attr<=3]' },
  { type: 'nested attribute', example: '[attr.level2="foo"]' },
  { type: 'field', example: 'FunctionDeclaration > Identifier.id' },
  { type: 'First or last child', example: ':first-child or :last-child' },
  { type: 'nth-child (no ax+b support)', example: ':nth-child(2)' },
  { type: 'nth-last-child (no ax+b support)', example: ':nth-last-child(1)' },
  { type: 'descendant', example: 'ancestor descendant' },
  { type: 'child', example: 'parent > child' },
  { type: 'following sibling', example: 'node ~ sibling' },
  { type: 'adjacent sibling', example: 'node + adjacent' },
  { type: 'negation', example: ':not(ForStatement)' },
  { type: 'has', example: ':has(ForStatement)' },
  { type: 'matches-any', example: ':matches([attr] > :first-child, :last-child)' },
  { type: 'subject indicator', example: '!IfStatement > [name="foo"]' },
  { type: 'class of AST node', example: ':statement, :expression, :declaration, :function, or :pattern' },
];

export class PromptForSearchCommand implements Disposable {
  public static key = 'ast-query.promptForSearch';

  private disposable: Disposable;

  constructor() {
    this.disposable = commands.registerCommand(PromptForSearchCommand.key, async ({
      scope,
    }: {
      scope: SearchScope;
    }) => {
      const options: QuickPickItem[] = supportedSelectors.map((selector) => ({
        label: selector.example,
        description: selector.type,
        alwaysShow: true,
      }));

      const result = await showQuickPick({
        title: `Search ${scope === SearchScope.global ? 'all files' : 'active file'}`,
        items: options,
      });

      if (!result) {
        return;
      }

      await commands.executeCommand(SearchCommand.key, result, {
        scope,
      });
    });
  }

  dispose() {
    return this.disposable.dispose();
  }
}
