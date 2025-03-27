import { createDirectorie } from "../../utils/directories/create_directory.utils";
import { renderTemplateAndWriteFile } from "../../utils/files/file.utils.";
import path from "path";
import { showInOutputChannel } from "../../utils/logs/log.utils";

async function createRequiredDirectories(domainPath: string, domain: { name: string }): Promise<void> {
    const directories = [
        path.join(domainPath, "entities", domain.name),
        path.join(domainPath, "repositories", domain.name),
        path.join(domainPath, "usecases", domain.name),
    ];

    for (const directory of directories) {
        try {
            await createDirectorie(directory); // Asume que createDirectorie devuelve una promesa
            showInOutputChannel( `Directory created successfully: ${directory}`);
        } catch (err) {
            throw err; 
        }
    }
}

async function generateRepositoryFile(outputFile: string, domain: { name: string; className: string }): Promise<void> {
    try {
        await renderTemplateAndWriteFile(
            "templates/domain/repositories/repositories.mustache",
            outputFile,
            domain
        );
        showInOutputChannel(`Repositories file generated successfully: ${outputFile}`);
    } catch (err) {
        throw err; 
    }
}


async function generateEntityFile(outputFile: string, domain: { name: string; className: string }): Promise<void> {
    
        try {
            await  renderTemplateAndWriteFile(
                "scripts/generate-domain/templates/domain/entities/entity.mustache",
                outputFile,
                domain
            );
            
            showInOutputChannel( `Entity file generated successfully: ${outputFile}`);

        } catch (err) {
            throw err; 
        }

}

function generateUseCaseFile(outputFile: string, domain: { name: string; className: string }): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            renderTemplateAndWriteFile(
                "scripts/generate-domain/templates/domain/usecases/usecase.mustache",
                outputFile,
                domain
            );
           
            showInOutputChannel(`UseCase file generated successfully: ${outputFile}`);

            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

export async function generateDataFiles(domain: { name: string; className: string }): Promise<void> {
    const domainPath = `./src/domain/`;

    try {
        
        await createRequiredDirectories(domainPath, domain);

         
        //showInOutputChannel( `Holi test :D`);
        await generateEntityFile(`${domainPath}/entities/${domain.name}/${domain.name}-entity.ts`, domain);
        
        
        
         await generateRepositoryFile(`${domainPath}/repositories/${domain.name}/${domain.name}.repository.ts`, domain);
        // await generateUseCaseFile(`${domainPath}/usecases/${domain.name}/get-${domain.name}.usecase.ts`, domain);
        // showInOutputChannel( `✅ Data layer created`);

    } catch (err) {
        throw err; 
    }
}