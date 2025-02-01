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
exports.WebviewService = void 0;
const vscode = __importStar(require("vscode"));
const vscodeAdapter_1 = require("../../infrastructure/adapters/vscodeAdapter");
const webviewAdapter_1 = require("../../infrastructure/adapters/webviewAdapter");
let panel = undefined;
class WebviewService {
    vscodeAdapter;
    webviewAdapter;
    constructor() {
        this.vscodeAdapter = vscodeAdapter_1.VSCODE_ADAPTER;
        this.webviewAdapter = webviewAdapter_1.WebviewAdapter;
    }
    openWebview(title) {
        if (!panel) {
            panel = this.webviewAdapter.createWebviewPanel('frameworkWebview', title, vscode.ViewColumn.One, {
                enableScripts: true,
                retainContextWhenHidden: true
            });
            panel.onDidDispose(() => {
                panel = undefined;
            }, null, []);
            panel.webview.onDidReceiveMessage((message) => {
                if (message.command === 'showMessage') {
                    vscode.window.showInformationMessage(`¡Botón presionado en ${panel?.title}!`);
                }
            });
            // Cargar contenido desde archivos externos
            const scriptUri = this.webviewAdapter.asWebviewUri(this.vscodeAdapter.context.extensionUri, ['ui', 'views', 'webview', 'index.js']);
            const styleUri = this.webviewAdapter.asWebviewUri(this.vscodeAdapter.context.extensionUri, ['ui', 'views', 'webview', 'styles.css']);
            const htmlUri = this.webviewAdapter.asWebviewUri(this.vscodeAdapter.context.extensionUri, ['ui', 'views', 'webview', 'index.html']);
            // Leer el contenido del archivo HTML
            vscode.workspace.fs.readFile(htmlUri).then(data => {
                const htmlContent = new TextDecoder().decode(data);
                panel.webview.html = this.injectStylesAndScripts(htmlContent, styleUri, scriptUri);
            });
        }
        else {
            panel.title = title;
        }
    }
    injectStylesAndScripts(htmlContent, styleUri, scriptUri) {
        const headEndIndex = htmlContent.indexOf('</head>');
        const bodyEndIndex = htmlContent.indexOf('</body>');
        if (headEndIndex !== -1 && bodyEndIndex !== -1) {
            const headWithStyle = `${htmlContent.substring(0, headEndIndex)}<link rel="stylesheet" href="${styleUri}">${htmlContent.substring(headEndIndex)}`;
            const bodyWithScript = `${headWithStyle.substring(0, bodyEndIndex)}<script src="${scriptUri}"></script>${headWithStyle.substring(bodyEndIndex)}`;
            return bodyWithScript;
        }
        return htmlContent; // Si no se encuentra </head> o </body>, simplemente devolvemos el contenido original
    }
}
exports.WebviewService = WebviewService;
//# sourceMappingURL=webviewService.js.map