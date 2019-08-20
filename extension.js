const { window, commands } = require('vscode');

const COLLAPSE = 'workbench.files.action.collapseExplorerFolders';
const REVEAL = 'revealInExplorer';

function activate(context) {
  const subscription = window.onDidChangeActiveTextEditor(showOnlyCurrentFile);
  context.subscriptions.push(subscription);
  showOnlyCurrentFile();
}

async function showOnlyCurrentFile() {
  await commands.executeCommand(COLLAPSE);
  await commands.executeCommand(REVEAL);
  if (!window.activeTextEditor) return;
  window.showTextDocument(window.activeTextEditor.document);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
