"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplateAndWriteFile = renderTemplateAndWriteFile;
const promises_1 = __importDefault(require("fs/promises"));
const mustache_1 = __importDefault(require("mustache"));
const log_utils_1 = require("../logs/log.utils");
async function renderTemplateAndWriteFile(templatePath, outputPath, data) {
    try {
        const template = await promises_1.default.readFile(templatePath, "utf8");
        const output = mustache_1.default.render(template, data);
        await promises_1.default.writeFile(outputPath, output);
        (0, log_utils_1.showInOutputChannel)(`File created successfully: ${outputPath}`);
    }
    catch (err) {
        const errorMessage = `\n Error creating file: \n${err}`;
        throw new Error(errorMessage);
    }
}
//# sourceMappingURL=file.utils..js.map