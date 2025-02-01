import * as vscode from 'vscode';
export function registerShowProjectPathCommand(context: vscode.ExtensionContext) {
    const showProjectPathCommand = vscode.commands.registerCommand('rudo.showProjectPath', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        if (workspaceFolders && workspaceFolders.length > 0) {
            const projectPath = workspaceFolders[0].uri.fsPath;
            console.log(`Ruta del proyecto: ${projectPath}`);
            vscode.window.showInformationMessage(`Ruta del proyecto: ${projectPath}`);

        } else {
            vscode.window.showWarningMessage('No hay ningún proyecto abierto.');
            const terminal = vscode.window.createTerminal('Node Script Runner');
            terminal.show();

            // Ejecutar el archivo con Node.js
            terminal.sendText(`node --input-type=commonjs "C:/Users/willi/Desktop/Proyectos/vscode/hybrid-vscode-extension/src/core/scripts/generate-domain/index.js"`);
        }
    });

    context.subscriptions.push(showProjectPathCommand);
}