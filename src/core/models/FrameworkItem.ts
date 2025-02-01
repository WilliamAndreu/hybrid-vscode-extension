import * as vscode from 'vscode';

export class FrameworkItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly description: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None,
        public readonly children: FrameworkItem[] = [],
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.tooltip = description;
        this.description = description;
        if (command) {
            this.command = command;
        }
    }
}