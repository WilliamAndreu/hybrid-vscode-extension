"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode = __importStar(require("vscode"));
// Variable para almacenar la referencia de la Webview
let panel = undefined;
// Clase que representa un elemento del árbol
class FrameworkItem extends vscode.TreeItem {
    label;
    description;
    collapsibleState;
    children;
    command;
    constructor(label, description, collapsibleState = vscode.TreeItemCollapsibleState.None, children = [], command) {
        super(label, collapsibleState);
        this.label = label;
        this.description = description;
        this.collapsibleState = collapsibleState;
        this.children = children;
        this.command = command;
        this.tooltip = description;
        this.description = description;
        if (command) {
            this.command = command;
        }
    }
}
// Proveedor de datos para la vista en la barra lateral
class FrameworkDataProvider {
    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element) {
            return Promise.resolve(element.children);
        }
        else {
            return Promise.resolve(this.getFrameworks());
        }
    }
    getFrameworks() {
        return [
            new FrameworkItem('Flutter', 'Librería para interfaces', vscode.TreeItemCollapsibleState.Collapsed, [
                new FrameworkItem('Views', 'Gestión de estado', vscode.TreeItemCollapsibleState.None, [], { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Flutter Views'] }),
                new FrameworkItem('Components', 'Proveedor reactivo de dependencias', vscode.TreeItemCollapsibleState.None, [], { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Flutter Components'] }),
            ]),
            new FrameworkItem('Angular', 'Framework completo', vscode.TreeItemCollapsibleState.Collapsed, [
                new FrameworkItem('Views', 'Programación reactiva', vscode.TreeItemCollapsibleState.None, [], { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Angular Views'] }),
                new FrameworkItem('Components', 'Gestión de estado reactivo', vscode.TreeItemCollapsibleState.None, [], { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Angular Components'] }),
            ]),
            new FrameworkItem('Ionic', 'Ligero y flexible', vscode.TreeItemCollapsibleState.Collapsed, [
                new FrameworkItem('Views', 'Plugins nativos', vscode.TreeItemCollapsibleState.None, [], { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Ionic Views'] }),
                new FrameworkItem('Components', 'Web Components', vscode.TreeItemCollapsibleState.None, [], { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Ionic Components'] }),
            ]),
        ];
    }
}
function activate(context) {
    console.log('Extensión activada');
    // Registrar el TreeDataProvider
    const frameworkDataProvider = new FrameworkDataProvider();
    vscode.window.registerTreeDataProvider('frameworkSelector', frameworkDataProvider);
    // Comando para abrir o actualizar la Webview
    const openWebviewCommand = vscode.commands.registerCommand('rudo.openWebview', (title) => {
        if (!panel) {
            panel = vscode.window.createWebviewPanel('frameworkWebview', title, vscode.ViewColumn.One, {
                enableScripts: true, // Habilitamos JavaScript en la Webview
                retainContextWhenHidden: true
            });
            panel.onDidDispose(() => {
                panel = undefined;
            }, null, context.subscriptions);
            // Escuchar mensajes desde la Webview (solo una vez cuando se crea la Webview)
            panel.webview.onDidReceiveMessage((message) => {
                if (message.command === 'showMessage') {
                    vscode.window.showInformationMessage(`¡Botón presionado en ${panel?.title}!`);
                }
            });
        }
        else {
            panel.title = title;
        }
        // Actualizar el contenido de la Webview
        panel.webview.html = getWebviewContent(title);
    });
    context.subscriptions.push(openWebviewCommand);
}
// Función para generar contenido de la Webview con un botón
function getWebviewContent(title) {
    return `<!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
          body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
          h1 { color: #007acc; }
          button { 
              padding: 10px 20px; 
              font-size: 16px; 
              background-color: #007acc; 
              color: white; 
              border: none; 
              cursor: pointer; 
              margin-top: 20px; 
              border-radius: 5px;
          }
          button:hover { background-color: #005fa3; }
      </style>
  </head>
  <body>
      <h1>${title}</h1>
      <p>Bienvenido a la sección de <strong>${title}</strong>.</p>
      <button onclick="sendMessage()">Presionar botón</button>

      <script>
          const vscode = acquireVsCodeApi();

          function sendMessage() {
              vscode.postMessage({ command: 'showMessage' });
          }
      </script>
  </body>
  </html>`;
}
//# sourceMappingURL=extension.js.map