"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDataFiles = generateDataFiles;
const create_directory_utils_1 = require("../../utils/directories/create_directory.utils");
const file_utils_1 = require("../../utils/files/file.utils.");
const path_1 = __importDefault(require("path"));
const log_utils_1 = require("../../utils/logs/log.utils");
async function createRequiredDirectories(domainPath, domain) {
    const directories = [
        path_1.default.join(domainPath, "entities", domain.name),
        path_1.default.join(domainPath, "repositories", domain.name),
        path_1.default.join(domainPath, "usecases", domain.name),
    ];
    for (const directory of directories) {
        try {
            await (0, create_directory_utils_1.createDirectorie)(directory); // Asume que createDirectorie devuelve una promesa
            (0, log_utils_1.showInOutputChannel)(`Directory created successfully: ${directory}`);
        }
        catch (err) {
            throw err;
        }
    }
}
async function generateRepositoryFile(outputFile, domain) {
    try {
        await (0, file_utils_1.renderTemplateAndWriteFile)("templates/domain/repositories/repositories.mustache", outputFile, domain);
        (0, log_utils_1.showInOutputChannel)(`Repositories file generated successfully: ${outputFile}`);
    }
    catch (err) {
        throw err;
    }
}
async function generateEntityFile(outputFile, domain) {
    try {
        await (0, file_utils_1.renderTemplateAndWriteFile)("scripts/generate-domain/templates/domain/entities/entity.mustache", outputFile, domain);
        (0, log_utils_1.showInOutputChannel)(`Entity file generated successfully: ${outputFile}`);
    }
    catch (err) {
        throw err;
    }
}
function generateUseCaseFile(outputFile, domain) {
    return new Promise((resolve, reject) => {
        try {
            (0, file_utils_1.renderTemplateAndWriteFile)("scripts/generate-domain/templates/domain/usecases/usecase.mustache", outputFile, domain);
            (0, log_utils_1.showInOutputChannel)(`UseCase file generated successfully: ${outputFile}`);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
async function generateDataFiles(domain) {
    const domainPath = `./src/domain/`;
    try {
        await createRequiredDirectories(domainPath, domain);
        //showInOutputChannel( `Holi test :D`);
        await generateEntityFile(`${domainPath}/entities/${domain.name}/${domain.name}-entity.ts`, domain);
        await generateRepositoryFile(`${domainPath}/repositories/${domain.name}/${domain.name}.repository.ts`, domain);
        // await generateUseCaseFile(`${domainPath}/usecases/${domain.name}/get-${domain.name}.usecase.ts`, domain);
        // showInOutputChannel( `✅ Data layer created`);
    }
    catch (err) {
        throw err;
    }
}
//# sourceMappingURL=data.js.map