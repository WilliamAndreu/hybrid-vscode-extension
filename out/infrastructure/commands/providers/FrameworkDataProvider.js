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
exports.FrameworkDataProvider = void 0;
const vscode = __importStar(require("vscode"));
const FrameworkItem_1 = require("../../../core/models/FrameworkItem");
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
            new FrameworkItem_1.FrameworkItem('Flutter', 'Librería para interfaces', vscode.TreeItemCollapsibleState.Collapsed, [
                new FrameworkItem_1.FrameworkItem('Views', 'Gestión de estado', vscode.TreeItemCollapsibleState.None, [], {
                    command: 'rudo.openWebview',
                    title: 'Abrir WebView',
                    arguments: ['Flutter Views'],
                }),
                new FrameworkItem_1.FrameworkItem('Components', 'Proveedor reactivo de dependencias', vscode.TreeItemCollapsibleState.None, [], {
                    command: 'rudo.openWebview',
                    title: 'Abrir WebView',
                    arguments: ['Flutter Components'],
                }),
                new FrameworkItem_1.FrameworkItem('Domain', 'Crea un nuevo dominio para tu app', vscode.TreeItemCollapsibleState.None, [], {
                    command: 'rudo.showProjectPath',
                    title: 'Mostrar Ruta del Proyecto',
                }),
            ]),
            // Repetir para Angular e Ionic...
        ];
    }
}
exports.FrameworkDataProvider = FrameworkDataProvider;
//# sourceMappingURL=FrameworkDataProvider.js.map