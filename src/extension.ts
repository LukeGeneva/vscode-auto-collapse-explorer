// The module 'vscode' contains the VS Code extensibility API

import { commands, ExtensionContext, TextEditor, window } from 'vscode';

// Import the module and reference it with the alias vscode in your code below
const COLLAPSE = 'workbench.files.action.collapseExplorerFolders';
const REVEAL = 'revealInExplorer';
const FOCUS_EDITOR = 'workbench.action.focusActiveEditorGroup';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  const subscription = window.onDidChangeActiveTextEditor(showOnlyCurrentFile);
  context.subscriptions.push(subscription);
}

async function showOnlyCurrentFile(textEditor: TextEditor | undefined) {
  const fileExpectedInExplorer = textEditor?.document.uri.scheme === 'file';
  if (!fileExpectedInExplorer) {
    return;
  }
  await commands.executeCommand(COLLAPSE);
  await commands.executeCommand(REVEAL);
  await commands.executeCommand(FOCUS_EDITOR);
}

// this method is called when your extension is deactivated
export function deactivate() {}
