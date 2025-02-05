import * as vscode from 'vscode';
import { generateDomainMain } from '../../core/scripts/angular/main';
import { showImportsDomainModule } from '../../core/utils/logs/log.utils';
export function registerShowProjectPathCommand(context: vscode.ExtensionContext) {
    const showProjectPathCommand = vscode.commands.registerCommand('rudo.showProjectPath', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        if (workspaceFolders && workspaceFolders.length > 0) {
            const projectPath = workspaceFolders[0].uri.fsPath;
            console.log(`Ruta del proyecto: ${projectPath}`);
            generateDomainMain(workspaceFolders[0].uri.fsPath);

            vscode.window.showInformationMessage(`Ruta del proyecto: ${projectPath}`);

        } else {
            vscode.window.showWarningMessage('No hay ningún proyecto abierto.');
        }
    });

    context.subscriptions.push(showProjectPathCommand);
}