"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDirectorie = createDirectorie;
const promises_1 = __importDefault(require("fs/promises")); // Usamos fs/promises para trabajar con promesas
async function createDirectorie(folderPath) {
    try {
        await promises_1.default.mkdir(folderPath, { recursive: true }); // Usamos mkdir con opción recursive
        console.log("\x1b[32m Directories created successfully:", folderPath);
    }
    catch (err) {
        console.error("\x1b[31m Error creating directories:", err);
    }
}
//# sourceMappingURL=create_directory.utils.js.map