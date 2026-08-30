import {
  commands,
  env,
  ExtensionContext,
  TextEditor,
  TreeDataProvider,
  TreeView,
  Uri,
  window,
} from 'vscode';

const COLLAPSE = 'workbench.files.action.collapseExplorerFolders';
const REVEAL = 'revealInExplorer';
const FOCUS_EDITOR = 'workbench.action.focusActiveEditorGroup';
const SENTINEL_VIEW = 'autoCollapseExplorer.sentinel';
const NOTICE_STATE_KEY = 'autoCollapseExplorer.sentinelNoticeShown';
const README_URL =
  'https://github.com/LukeGeneva/vscode-auto-collapse-explorer#required-setup-keep-the-auto-collapse-explorer-section-expanded';

// The VS Code API has no way to ask whether the Explorer is showing, so we
// contribute an empty view to the Explorer container and read its visibility
// instead. A view is only visible while its container is the active viewlet.
let sentinel: TreeView<never> | undefined;

const emptyTreeDataProvider: TreeDataProvider<never> = {
  getChildren: () => [],
  getTreeItem: (element) => element,
};

export function activate(context: ExtensionContext) {
  sentinel = window.createTreeView(SENTINEL_VIEW, {
    treeDataProvider: emptyTreeDataProvider,
  });

  context.subscriptions.push(sentinel);
  context.subscriptions.push(
    window.onDidChangeActiveTextEditor(showOnlyCurrentFile)
  );

  showSentinelNoticeOnce(context);
}

// The empty section appears out of nowhere for anyone upgrading, so explain it
// once. We cannot tell a collapsed section apart from a closed sidebar, so this
// is shown on the first run after upgrading rather than when it goes quiet.
async function showSentinelNoticeOnce(context: ExtensionContext) {
  if (context.globalState.get(NOTICE_STATE_KEY)) return;
  await context.globalState.update(NOTICE_STATE_KEY, true);

  const learnMore = 'Learn more';
  const choice = await window.showInformationMessage(
    'Auto-Collapse Explorer added an empty "Auto-Collapse Explorer" section to ' +
      'the Explorer. Keep it expanded -- it is how the extension detects ' +
      'whether the Explorer is visible, so it no longer steals focus from ' +
      'Search and Source Control.',
    learnMore
  );

  if (choice === learnMore) {
    await env.openExternal(Uri.parse(README_URL));
  }
}

async function showOnlyCurrentFile(textEditor: TextEditor | undefined) {
  if (textEditor?.document.uri.scheme !== 'file') return;
  // Another window opening a file must not pull focus away from this one.
  if (!window.state.focused) return;
  if (!sentinel?.visible) return;

  await commands.executeCommand(COLLAPSE);
  await commands.executeCommand(REVEAL);
  await commands.executeCommand(FOCUS_EDITOR);
}

export function deactivate() {
  sentinel = undefined;
}
