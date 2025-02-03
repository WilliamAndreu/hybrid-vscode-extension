import fs from "fs/promises"; // Usamos fs/promises para trabajar con promesas


export async function createDirectorie(folderPath: string): Promise<void> {
    try {
        await fs.mkdir(folderPath, { recursive: true }); // Usamos mkdir con opción recursive
        console.log("\x1b[32m Directories created successfully:", folderPath);
    } catch (err) {
        console.error("\x1b[31m Error creating directories:", err);
    }
}