import { createDirectorie } from "../../utils/directories/create_directory.utils";
import { renderTemplateAndWriteFile } from "../../utils/files/file.utils.";
import path from "path";

// Función para crear directorios requeridos
function createRequiredDirectories(domainPath: string, domain: { name: string }): Promise<void[]> {
    const directories = [
        path.join(domainPath, "entities", domain.name),
        path.join(domainPath, "repositories", domain.name),
        path.join(domainPath, "usecases", domain.name),
    ];

    return Promise.all(
        directories.map(directory =>
            new Promise<void>((resolve, reject) => {
                try {
                    createDirectorie(directory);
                    console.log("\x1b[37m Directory created successfully:", directory);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            })
        )
    );
}

// Función para generar el archivo del repositorio
function generateRepositoryFile(outputFile: string, domain: { name: string; className: string }): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            renderTemplateAndWriteFile(
                "scripts/generate-domain/templates/domain/repositories/repositories.mustache",
                outputFile,
                domain
            );
            console.log("\x1b[37m Repositories file generated successfully:", outputFile);
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

// Función para generar el archivo de entidad
function generateEntityFile(outputFile: string, domain: { name: string; className: string }): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            renderTemplateAndWriteFile(
                "scripts/generate-domain/templates/domain/entities/entity.mustache",
                outputFile,
                domain
            );
            console.log("\x1b[37m Entity file generated successfully:", outputFile);
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

// Función para generar el archivo de caso de uso
function generateUseCaseFile(outputFile: string, domain: { name: string; className: string }): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            renderTemplateAndWriteFile(
                "scripts/generate-domain/templates/domain/usecases/usecase.mustache",
                outputFile,
                domain
            );
            console.log("\x1b[37m UseCase file generated successfully:", outputFile);
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

// Función principal para generar archivos del dominio
export async function generateDataFiles(domain: { name: string; className: string }): Promise<void> {
    const domainPath = `./src/domain/`;

    try {
        await createRequiredDirectories(domainPath, domain);

        // Generar archivos
        await generateEntityFile(`${domainPath}/entities/${domain.name}/${domain.name}-entity.ts`, domain);
        await generateRepositoryFile(`${domainPath}/repositories/${domain.name}/${domain.name}.repository.ts`, domain);
        await generateUseCaseFile(`${domainPath}/usecases/${domain.name}/get-${domain.name}.usecase.ts`, domain);

        console.log("✅ \x1b[32m Data layer created\x1b[0m");
    } catch (err) {
        console.error("\x1b[31m Error:", err);
    }
}