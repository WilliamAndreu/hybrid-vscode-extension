import fs from "fs/promises"; // Usamos fs/promises para trabajar con promesas


export async function checkDirectoryExists(directoryPath: string): Promise<boolean> {
    try {
      await fs.access(directoryPath);
      return true;
    } catch (err) {
      return false;
    }
  }