import * as vscode from 'vscode';
import { WebviewService } from '../../core/services/webview/WebviewService';
import { getWebviewContent } from '../../presentation/views/getWebviewContent';

export function registerOpenWebviewCommand(context: vscode.ExtensionContext) {
    const openWebviewCommand = vscode.commands.registerCommand('rudo.openWebview', (title: string) => {
        const htmlContent = getWebviewContent(title);
        WebviewService.createOrShowWebview(title, htmlContent);
    });
    context.subscriptions.push(openWebviewCommand);
}