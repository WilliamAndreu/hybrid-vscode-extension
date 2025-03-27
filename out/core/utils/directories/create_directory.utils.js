"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDirectorie = createDirectorie;
const promises_1 = __importDefault(require("fs/promises")); // Usamos fs/promises para trabajar con promesas
const log_utils_1 = require("../logs/log.utils");
async function createDirectorie(folderPath) {
    try {
        await promises_1.default.mkdir(folderPath, { recursive: true });
        +(0, log_utils_1.showInOutputChannel)(`Directories created successfully: ${folderPath}`);
    }
    catch (err) {
        const errorMessage = `\n    Error creating directory "${folderPath}":\n${err}`;
        throw new Error(errorMessage);
    }
}
//# sourceMappingURL=create_directory.utils.js.map