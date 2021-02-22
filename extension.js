const { window, commands } = require('vscode');

const COLLAPSE = 'workbench.files.action.collapseExplorerFolders';
const REVEAL = 'revealInExplorer';
const FOCUS_EDITOR = 'workbench.action.focusActiveEditorGroup';

function activate(context) {
  const subscription = window.onDidChangeActiveTextEditor(showOnlyCurrentFile);
  context.subscriptions.push(subscription);
}

async function showOnlyCurrentFile(textEditor) {
  const fileExpectedInExplorer = textEditor?.document.uri.scheme === 'file';
  if (!fileExpectedInExplorer) return;
  await commands.executeCommand(COLLAPSE);
  await commands.executeCommand(REVEAL);
  await commands.executeCommand(FOCUS_EDITOR);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
