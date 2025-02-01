import * as vscode from 'vscode';

export class WebviewService {
    private static panel: vscode.WebviewPanel | undefined;

    public static createOrShowWebview(title: string, htmlContent: string): void {
        if (!this.panel) {
            this.panel = vscode.window.createWebviewPanel(
                'frameworkWebview',
                title,
                vscode.ViewColumn.One,
                { enableScripts: true, retainContextWhenHidden: true }
            );
            this.panel.onDidDispose(() => {
                this.panel = undefined;
            });
            this.panel.webview.onDidReceiveMessage((message) => {
                if (message.command === 'showMessage') {
                    vscode.window.showInformationMessage(`¡Botón presionado en ${this.panel?.title}!`);
                }
            });
        } else {
            this.panel.title = title;
        }
        this.panel.webview.html = htmlContent;
    }
}