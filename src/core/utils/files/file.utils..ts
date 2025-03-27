import fs from "fs/promises"; 
import mustache from "mustache";
import { showInOutputChannel } from "../logs/log.utils";


export async function renderTemplateAndWriteFile(
    templatePath: string,
    outputPath: string,
    data: Record<string, any>
): Promise<void> {
    try {

        const template = await fs.readFile(templatePath, "utf8"); 
        const output = mustache.render(template, data); 
        await fs.writeFile(outputPath, output); 
        showInOutputChannel(`File created successfully: ${outputPath}`);
    } catch (err) {
        const errorMessage = `\n Error creating file: \n${err}`;
        throw new Error(errorMessage);

    }
}