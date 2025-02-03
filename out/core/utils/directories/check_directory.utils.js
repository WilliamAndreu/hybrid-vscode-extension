"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDirectoryExists = checkDirectoryExists;
const promises_1 = __importDefault(require("fs/promises")); // Usamos fs/promises para trabajar con promesas
async function checkDirectoryExists(directoryPath) {
    try {
        await promises_1.default.access(directoryPath);
        return true;
    }
    catch (err) {
        return false;
    }
}
//# sourceMappingURL=check_directory.utils.js.map