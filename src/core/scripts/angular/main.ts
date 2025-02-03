import * as vscode from "vscode";
import { generateDataFiles } from "./data";
import { generateDomainFiles } from "./domain";
import { showImportsDomainModule } from "../../utils/logs/log.utils";
import { environment } from "../../environments/environment";
import { checkDirectoryExists } from "../../utils/directories/check_directory.utils";
import { capitalizeFirstLetter } from "../../utils/strings/capitalize.utils";



/**
 * Función principal para generar archivos del dominio
 */
export async function generateDomainMain(mainDir: string): Promise<void> {
  const domainName = await askForDomainName();

  if (!domainName) {
    console.log("\x1b[31m Invalid domain name");
    return;
  }

  const className = capitalizeFirstLetter(domainName);
  const dataPath = `./domains/${domainName}`;

  try {
    const exists = await checkDirectoryExists(dataPath);

    if (exists) {
      console.log("\x1b[31m Domain already exists:", domainName);
      return;
    }

    console.log("\x1b[32m Generating files for domain:", domainName);

    await generateDataFiles({ name: domainName, className });
    await generateDomainFiles({ name: domainName, className });
    await showImportsDomainModule({ name: domainName, className });

    console.log("\x1b[32m Files generated successfully!");
  } catch (err) {
    console.error("Error generating domain files:", err);
  }
}

/**
 * Solicita al usuario el nombre del dominio
 * @returns El nombre del dominio ingresado por el usuario
 */
async function askForDomainName(): Promise<string | undefined> {
  const options: vscode.InputBoxOptions = {
    prompt: environment.DOMAIN_PROMPT,
    placeHolder: environment.DOMAIN_PLACEHOLDER,
    validateInput: (text: string) => {
      if (!text || text.trim().length === 0) {
        return "Domain name cannot be empty";
      }
      return null; // Validación exitosa
    },
  };

  return vscode.window.showInputBox(options);
}

