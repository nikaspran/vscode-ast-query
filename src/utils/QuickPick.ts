import { window, QuickPickItem } from 'vscode';

export async function showQuickPick<T extends QuickPickItem>({
  title,
  items,
}: {
  title?: string;
  items: T[];
}): Promise<string> {
  return new Promise((resolve, reject) => {
    const quickpick = window.createQuickPick();

    quickpick.title = title;
    quickpick.items = items;

    quickpick.onDidAccept(() => {
      quickpick.hide();
      resolve(quickpick.value);
    });
    quickpick.onDidHide(reject);

    quickpick.show();
  });
}
