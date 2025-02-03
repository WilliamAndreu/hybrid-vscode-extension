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
exports.generateDomainMain = generateDomainMain;
const vscode = __importStar(require("vscode"));
const data_1 = require("./data");
const domain_1 = require("./domain");
const log_utils_1 = require("../../utils/logs/log.utils");
const environment_1 = require("../../environments/environment");
const check_directory_utils_1 = require("../../utils/directories/check_directory.utils");
const capitalize_utils_1 = require("../../utils/strings/capitalize.utils");
/**
 * Función principal para generar archivos del dominio
 */
async function generateDomainMain(mainDir) {
    const domainName = await askForDomainName();
    if (!domainName) {
        console.log("\x1b[31m Invalid domain name");
        return;
    }
    const className = (0, capitalize_utils_1.capitalizeFirstLetter)(domainName);
    const dataPath = `./domains/${domainName}`;
    try {
        const exists = await (0, check_directory_utils_1.checkDirectoryExists)(dataPath);
        if (exists) {
            console.log("\x1b[31m Domain already exists:", domainName);
            return;
        }
        console.log("\x1b[32m Generating files for domain:", domainName);
        await (0, data_1.generateDataFiles)({ name: domainName, className });
        await (0, domain_1.generateDomainFiles)({ name: domainName, className });
        await (0, log_utils_1.showImportsDomainModule)({ name: domainName, className });
        console.log("\x1b[32m Files generated successfully!");
    }
    catch (err) {
        console.error("Error generating domain files:", err);
    }
}
/**
 * Solicita al usuario el nombre del dominio
 * @returns El nombre del dominio ingresado por el usuario
 */
async function askForDomainName() {
    const options = {
        prompt: environment_1.environment.DOMAIN_PROMPT,
        placeHolder: environment_1.environment.DOMAIN_PLACEHOLDER,
        validateInput: (text) => {
            if (!text || text.trim().length === 0) {
                return "Domain name cannot be empty";
            }
            return null; // Validación exitosa
        },
    };
    return vscode.window.showInputBox(options);
}
//# sourceMappingURL=main.js.map