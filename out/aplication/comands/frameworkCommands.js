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
exports.activateCommands = activateCommands;
const vscode = __importStar(require("vscode"));
const webviewService_1 = require("../services/webviewService");
function activateCommands(context) {
    const webviewService = new webviewService_1.WebviewService();
    const openWebviewCommand = vscode.commands.registerCommand('rudo.openWebview', (title) => {
        webviewService.openWebview(title);
    });
    context.subscriptions.push(openWebviewCommand);
    const showProjectPathCommand = vscode.commands.registerCommand('rudo.showProjectPath', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            const projectPath = workspaceFolders[0].uri.fsPath;
            console.log(`Ruta del proyecto: ${projectPath}`);
            vscode.window.showInformationMessage(`Ruta del proyecto: ${projectPath}`);
        }
        else {
            vscode.window.showWarningMessage('No hay ningún proyecto abierto.');
        }
    });
    context.subscriptions.push(showProjectPathCommand);
}
//# sourceMappingURL=frameworkCommands.js.map