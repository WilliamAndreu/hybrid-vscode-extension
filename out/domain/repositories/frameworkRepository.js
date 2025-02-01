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
exports.FrameworkRepository = void 0;
const frameworkItem_1 = require("../entities/frameworkItem");
const vscode = __importStar(require("vscode"));
class FrameworkRepository {
    getFrameworks() {
        return [
            new frameworkItem_1.FrameworkItem('Flutter', 'Librería para interfaces', vscode.TreeItemCollapsibleState.Collapsed, [
                new frameworkItem_1.FrameworkItem('Views', 'Gestión de estado', vscode.TreeItemCollapsibleState.None, [], { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Flutter Views'] }),
                new frameworkItem_1.FrameworkItem('Components', 'Proveedor reactivo de dependencias', vscode.TreeItemCollapsibleState.None, [], { command: 'rudo.openWebview', title: "Abrir WebView", arguments: ['Flutter Components'] }),
                new frameworkItem_1.FrameworkItem('Domain', 'Crea un nuevo dominio para tu app', vscode.TreeItemCollapsibleState.None, [], { command: 'rudo.showProjectPath', title: "Mostrar Ruta del Proyecto" }),
            ]),
            // ... otros frameworks
        ];
    }
}
exports.FrameworkRepository = FrameworkRepository;
//# sourceMappingURL=frameworkRepository.js.map