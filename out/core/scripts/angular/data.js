"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDataFiles = generateDataFiles;
const create_directory_utils_1 = require("../../utils/directories/create_directory.utils");
const file_utils_1 = require("../../utils/files/file.utils.");
const path_1 = __importDefault(require("path"));
// Función para crear directorios requeridos
function createRequiredDirectories(domainPath, domain) {
    const directories = [
        path_1.default.join(domainPath, "entities", domain.name),
        path_1.default.join(domainPath, "repositories", domain.name),
        path_1.default.join(domainPath, "usecases", domain.name),
    ];
    return Promise.all(directories.map(directory => new Promise((resolve, reject) => {
        try {
            (0, create_directory_utils_1.createDirectorie)(directory);
            console.log("\x1b[37m Directory created successfully:", directory);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    })));
}
// Función para generar el archivo del repositorio
function generateRepositoryFile(outputFile, domain) {
    return new Promise((resolve, reject) => {
        try {
            (0, file_utils_1.renderTemplateAndWriteFile)("scripts/generate-domain/templates/domain/repositories/repositories.mustache", outputFile, domain);
            console.log("\x1b[37m Repositories file generated successfully:", outputFile);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
// Función para generar el archivo de entidad
function generateEntityFile(outputFile, domain) {
    return new Promise((resolve, reject) => {
        try {
            (0, file_utils_1.renderTemplateAndWriteFile)("scripts/generate-domain/templates/domain/entities/entity.mustache", outputFile, domain);
            console.log("\x1b[37m Entity file generated successfully:", outputFile);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
// Función para generar el archivo de caso de uso
function generateUseCaseFile(outputFile, domain) {
    return new Promise((resolve, reject) => {
        try {
            (0, file_utils_1.renderTemplateAndWriteFile)("scripts/generate-domain/templates/domain/usecases/usecase.mustache", outputFile, domain);
            console.log("\x1b[37m UseCase file generated successfully:", outputFile);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
// Función principal para generar archivos del dominio
async function generateDataFiles(domain) {
    const domainPath = `./src/domain/`;
    try {
        await createRequiredDirectories(domainPath, domain);
        // Generar archivos
        await generateEntityFile(`${domainPath}/entities/${domain.name}/${domain.name}-entity.ts`, domain);
        await generateRepositoryFile(`${domainPath}/repositories/${domain.name}/${domain.name}.repository.ts`, domain);
        await generateUseCaseFile(`${domainPath}/usecases/${domain.name}/get-${domain.name}.usecase.ts`, domain);
        console.log("✅ \x1b[32m Domain layer created\x1b[0m");
    }
    catch (err) {
        console.error("\x1b[31m Error:", err);
    }
}
//# sourceMappingURL=data.js.map