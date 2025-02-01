import * as vscode from 'vscode';
import { FrameworkItem } from '../../core/models/FrameworkItem';

export class FrameworkDataProvider implements vscode.TreeDataProvider<FrameworkItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<FrameworkItem | undefined | null | void> =
        new vscode.EventEmitter<FrameworkItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<FrameworkItem | undefined | null | void> =
        this._onDidChangeTreeData.event;

    getTreeItem(element: FrameworkItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: FrameworkItem): Thenable<FrameworkItem[]> {
        if (element) {
            return Promise.resolve(element.children);
        } else {
            return Promise.resolve(this.getFrameworks());
        }
    }

    private getFrameworks(): FrameworkItem[] {
        return [
            new FrameworkItem(
                'Flutter',
                'Librería para interfaces',
                vscode.TreeItemCollapsibleState.Collapsed,
                [
                    new FrameworkItem('Views', 'Gestión de estado', vscode.TreeItemCollapsibleState.None, [], {
                        command: 'rudo.openWebview',
                        title: 'Abrir WebView',
                        arguments: ['Flutter Views'],
                    }),
                    new FrameworkItem('Components', 'Proveedor reactivo de dependencias', vscode.TreeItemCollapsibleState.None, [], {
                        command: 'rudo.openWebview',
                        title: 'Abrir WebView',
                        arguments: ['Flutter Components'],
                    }),
                    new FrameworkItem('Domain', 'Crea un nuevo dominio para tu app', vscode.TreeItemCollapsibleState.None, [], {
                        command: 'rudo.showProjectPath',
                        title: 'Mostrar Ruta del Proyecto',
                    }),
                ]
            ),

            new FrameworkItem(
                'Ionic',
                'Librería para interfaces',
                vscode.TreeItemCollapsibleState.Collapsed,
                [
                    new FrameworkItem('Views', 'Gestión de estado', vscode.TreeItemCollapsibleState.None, [], {
                        command: 'rudo.openWebview',
                        title: 'Abrir WebView',
                        arguments: ['Ionic Views'],
                    }),
                    new FrameworkItem('Components', 'Proveedor reactivo de dependencias', vscode.TreeItemCollapsibleState.None, [], {
                        command: 'rudo.openWebview',
                        title: 'Abrir WebView',
                        arguments: ['Ionic Components'],
                    }),
                    new FrameworkItem('Domain', 'Crea un nuevo dominio para tu app', vscode.TreeItemCollapsibleState.None, [], {
                        command: 'rudo.showProjectPath',
                        title: 'Mostrar Ruta del Proyecto',
                    }),
                ]
            ),
            new FrameworkItem(
                'Angular',
                'Librería para interfaces',
                vscode.TreeItemCollapsibleState.Collapsed,
                [
                    new FrameworkItem('Views', 'Gestión de estado', vscode.TreeItemCollapsibleState.None, [], {
                        command: 'rudo.openWebview',
                        title: 'Abrir WebView',
                        arguments: ['Angular Views'],
                    }),
                    new FrameworkItem('Components', 'Proveedor reactivo de dependencias', vscode.TreeItemCollapsibleState.None, [], {
                        command: 'rudo.openWebview',
                        title: 'Abrir WebView',
                        arguments: ['Angular Components'],
                    }),
                    new FrameworkItem('Domain', 'Crea un nuevo dominio para tu app', vscode.TreeItemCollapsibleState.None, [], {
                        command: 'rudo.showProjectPath',
                        title: 'Mostrar Ruta del Proyecto',
                    }),
                ]
            )

        ];
    }
}