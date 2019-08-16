const { window, commands } = require('vscode');

const COLLAPSE = 'workbench.files.action.collapseExplorerFolders';
const REVEAL = 'revealInExplorer';

function activate(context) {
  const subscription = window.onDidChangeVisibleTextEditors(handleChange);
  context.subscriptions.push(subscription);
  showOnlyCurrentFile();
}

function handleChange() {
  showOnlyCurrentFile();
}

function showOnlyCurrentFile(editors) {
  if (!editors || !editors.length) return;
  commands.executeCommand(COLLAPSE);
  commands.executeCommand(REVEAL);
  window.showTextDocument(editors[0].document);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
