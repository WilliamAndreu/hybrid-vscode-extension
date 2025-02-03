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
exports.registerShowProjectPathCommand = registerShowProjectPathCommand;
const vscode = __importStar(require("vscode"));
const log_utils_1 = require("../../core/utils/logs/log.utils");
function registerShowProjectPathCommand(context) {
    const showProjectPathCommand = vscode.commands.registerCommand('rudo.showProjectPath', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            const projectPath = workspaceFolders[0].uri.fsPath;
            console.log(`Ruta del proyecto: ${projectPath}`);
            // generateDomainMain(workspaceFolders[0].uri.fsPath);
            (0, log_utils_1.showImportsDomainModule)({ name: 'user', className: 'User' });
            vscode.window.showInformationMessage(`Ruta del proyecto: ${projectPath}`);
        }
        else {
            vscode.window.showWarningMessage('No hay ningún proyecto abierto.');
            const terminal = vscode.window.createTerminal('Node Script Runner');
            terminal.show();
            // Ejecutar el archivo con Node.js
            terminal.sendText(`node --input-type=commonjs "C:/Users/willi/Desktop/Proyectos/vscode/hybrid-vscode-extension/src/core/scripts/generate-domain/index.js"`);
        }
    });
    context.subscriptions.push(showProjectPathCommand);
}
//# sourceMappingURL=ShowProjectPathCommand.js.map