import fs from "fs/promises"; // Usamos fs/promises para trabajar con promesas
import mustache from "mustache";



// Función para renderizar una plantilla Mustache y escribir el archivo de salida
export async function renderTemplateAndWriteFile(
    templatePath: string,
    outputPath: string,
    data: Record<string, any>
): Promise<void> {
    try {
        const template = await fs.readFile(templatePath, "utf8"); // Leer el archivo de plantilla
        const output = mustache.render(template, data); // Renderizar la plantilla con los datos
        await fs.writeFile(outputPath, output); // Escribir el archivo de salida
        console.log("\x1b[32m File created successfully:", outputPath);
    } catch (err) {
        console.error("\x1b[31m Error creating file:", err);
    }
}