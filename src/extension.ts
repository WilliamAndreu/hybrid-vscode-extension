import * as vscode from 'vscode';

// Variable para almacenar la referencia de la Webview
let panel: vscode.WebviewPanel | undefined = undefined;

// Clase que representa un elemento del árbol
class FrameworkItem extends vscode.TreeItem {
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

// Proveedor de datos para la vista en la barra lateral
class FrameworkDataProvider implements vscode.TreeDataProvider<FrameworkItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<FrameworkItem | undefined | null | void> = new vscode.EventEmitter<FrameworkItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<FrameworkItem | undefined | null | void> = this._onDidChangeTreeData.event;

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
          new FrameworkItem(
            'Views', 'Gestión de estado', vscode.TreeItemCollapsibleState.None, [],
            { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Flutter Views'] }
          ),
          new FrameworkItem(
            'Components', 'Proveedor reactivo de dependencias', vscode.TreeItemCollapsibleState.None, [],
            { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Flutter Components'] }
          ),
        ]
      ),
      new FrameworkItem(
        'Angular',
        'Framework completo',
        vscode.TreeItemCollapsibleState.Collapsed,
        [
          new FrameworkItem(
            'Views', 'Programación reactiva', vscode.TreeItemCollapsibleState.None, [],
            { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Angular Views'] }
          ),
          new FrameworkItem(
            'Components', 'Gestión de estado reactivo', vscode.TreeItemCollapsibleState.None, [],
            { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Angular Components'] }
          ),
        ]
      ),
      new FrameworkItem(
        'Ionic',
        'Ligero y flexible',
        vscode.TreeItemCollapsibleState.Collapsed,
        [
          new FrameworkItem(
            'Views', 'Plugins nativos', vscode.TreeItemCollapsibleState.None, [],
            { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Ionic Views'] }
          ),
          new FrameworkItem(
            'Components', 'Web Components', vscode.TreeItemCollapsibleState.None, [],
            { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Ionic Components'] }
          ),
        ]
      ),
    ];
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Extensión activada');

  // Registrar el TreeDataProvider
  const frameworkDataProvider = new FrameworkDataProvider();
  vscode.window.registerTreeDataProvider('frameworkSelector', frameworkDataProvider);

  // Comando para abrir o actualizar la Webview
  const openWebviewCommand = vscode.commands.registerCommand('rudo.openWebview', (title: string) => {
    if (!panel) {
      panel = vscode.window.createWebviewPanel(
        'frameworkWebview',
        title,
        vscode.ViewColumn.One,
        {
          enableScripts: true,  // Habilitamos JavaScript en la Webview
          retainContextWhenHidden: true
        }
      );

      panel.onDidDispose(() => {
        panel = undefined;
      }, null, context.subscriptions);

      // Escuchar mensajes desde la Webview (solo una vez cuando se crea la Webview)
      panel.webview.onDidReceiveMessage((message) => {
        if (message.command === 'showMessage') {
          vscode.window.showInformationMessage(`¡Botón presionado en ${panel?.title}!`);
        }
      });
    } else {
      panel.title = title;
    }

    // Actualizar el contenido de la Webview
    panel.webview.html = getWebviewContent(title);
  });

  context.subscriptions.push(openWebviewCommand);
}

// Función para generar contenido de la Webview con un botón
function getWebviewContent(title: string): string {
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