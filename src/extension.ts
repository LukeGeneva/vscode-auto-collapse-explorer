import { commands, ExtensionContext, TextEditor, window } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // I know, I didn't need to make this a "command" but I thought it may be useful if we use the when clause solution
  // In all likeliness the whole implementation needs to be redone properly in vscode core to handle multiple editors with a new "collapseUnopened"
  const command = 'auto-collapse-explorer.collapse';
  let explorerVisible;
  context.subscriptions.push(
    window.onDidChangeActiveTextEditor(async (textEditor: TextEditor | undefined) => {
      const fileExpectedInExplorer = textEditor?.document.uri.scheme === 'file';
      if (!fileExpectedInExplorer) { // TODO check context or textEditor or explorerVisible for 
        return;
      }
      await commands.executeCommand(command);
    })
  );
  context.subscriptions.push(
    window.onDidChangeSelection(async ({ visible }) => {
      let explorerVisible = visible;
    });
  );

  const commandHandler = async () => {
    await commands.executeCommand('workbench.files.action.collapseExplorerFolders');
    await commands.executeCommand('revealInExplorer');
    // FIXME Is focusActiveEditorGroup necessary?
    await commands.executeCommand('workbench.action.focusActiveEditorGroup');
  };
  
  context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}



// this method is called when your extension is deactivated
export function deactivate() {}
