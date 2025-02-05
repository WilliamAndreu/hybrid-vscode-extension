import * as vscode from "vscode";
import { environment } from "../../environments/environment";


export async function domainPromptInput(): Promise<string | undefined> {
    const options: vscode.InputBoxOptions = {
        prompt: environment.DOMAIN_PROMPT,
        placeHolder: environment.DOMAIN_PLACEHOLDER,
        validateInput: (text: string) => {
            if (!text || text.trim().length === 0) {
                return "Domain name cannot be empty";
            }
            return null;
        }
    };

    return vscode.window.showInputBox(options);
}
