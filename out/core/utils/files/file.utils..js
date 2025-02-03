"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplateAndWriteFile = renderTemplateAndWriteFile;
const promises_1 = __importDefault(require("fs/promises")); // Usamos fs/promises para trabajar con promesas
const mustache_1 = __importDefault(require("mustache"));
// Función para renderizar una plantilla Mustache y escribir el archivo de salida
async function renderTemplateAndWriteFile(templatePath, outputPath, data) {
    try {
        const template = await promises_1.default.readFile(templatePath, "utf8"); // Leer el archivo de plantilla
        const output = mustache_1.default.render(template, data); // Renderizar la plantilla con los datos
        await promises_1.default.writeFile(outputPath, output); // Escribir el archivo de salida
        console.log("\x1b[32m File created successfully:", outputPath);
    }
    catch (err) {
        console.error("\x1b[31m Error creating file:", err);
    }
}
//# sourceMappingURL=file.utils..js.map