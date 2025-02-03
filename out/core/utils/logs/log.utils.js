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
exports.showImportsDomainModule = showImportsDomainModule;
exports.showInOutputChannel = showInOutputChannel;
const vscode = __importStar(require("vscode"));
function showImportsDomainModule(domain) {
    const titleImports = ` To use the domain you must add these imports in the data.module.ts file:`;
    const titleModuleImp = `Module implementation:`;
    const consoleImports = `
    import { Get${domain.className}UseCase } from "@usecases/${domain.name}/get-${domain.name}.usecase";
    import { ${domain.className}Repository } from "@repositories/${domain.name}/${domain.name}.repository";
    import { ${domain.className}RemoteDataSource } from "@data/datasource/${domain.name}/source/${domain.name}-remote-datasource";
    import { ${domain.className}ImpRepository } from "@data/repositories/${domain.name}/${domain.name}-implementation.repository";
    import { ${domain.className}RemoteDataSourceImp } from "@data/datasource/${domain.name}/remote/${domain.name}-remote-datasource-imp";
    import { ${domain.className}LocalDataSourceImp } from "@data/datasource/${domain.name}/local/${domain.name}-local-datasource-imp";
    import { ${domain.className}LocalDataSource } from "@data/datasource/${domain.name}/source/${domain.name}-local-datasource";
`;
    const moduleImp = `
         Get${domain.className}UseCase,
         { provide: ${domain.className}Repository, useClass: ${domain.className}ImpRepository },
         { provide: ${domain.className}RemoteDataSource, useClass: ${domain.className}RemoteDataSourceImp },
         { provide: ${domain.className}LocalDataSource, useClass: ${domain.className}LocalDataSourceImp },
         
    `;
    // console.log(titleImports);
    // console.log(consoleImports);
    // console.log(titleModuleImp);
    // console.log(moduleImp);
    showInOutputChannel("My Extension Logs", titleImports, true);
    showInOutputChannel("My Extension Logs", consoleImports);
    showInOutputChannel("My Extension Logs", titleModuleImp);
    showInOutputChannel("My Extension Logs", moduleImp);
}
const outputChannels = {};
function showInOutputChannel(channelName, message, clearBeforeShow = false) {
    // Verifica si ya existe un canal con este nombre
    let outputChannel = outputChannels[channelName];
    if (!outputChannel) {
        // Si no existe, créalo y guárdalo
        outputChannel = vscode.window.createOutputChannel(channelName);
        outputChannels[channelName] = outputChannel;
    }
    // Opcional: Limpiar el canal antes de mostrar el mensaje
    if (clearBeforeShow) {
        outputChannel.clear();
    }
    outputChannel.appendLine(message);
    outputChannel.show(true);
}
//# sourceMappingURL=log.utils.js.map