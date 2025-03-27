import fs from "fs/promises"; // Usamos fs/promises para trabajar con promesas
import { showInOutputChannel } from "../logs/log.utils";


export async function createDirectorie(folderPath: string): Promise<void> {
    try {
        await fs.mkdir(folderPath, { recursive: true }); 
+       showInOutputChannel(`Directories created successfully: ${folderPath}`);

    } catch (err) {
        const errorMessage = `\n    Error creating directory "${folderPath}":\n${err}`;
        throw new Error(errorMessage);
    }
}