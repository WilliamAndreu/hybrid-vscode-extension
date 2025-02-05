import { generateDataFiles } from "./data";
import { generateDomainFiles } from "./domain";
import { showImportsDomainModule, showInOutputChannel } from "../../utils/logs/log.utils";
import { checkDirectoryExists } from "../../utils/directories/check_directory.utils";
import { capitalizeFirstLetter } from "../../utils/strings/capitalize.utils";
import { domainPromptInput } from "../../services/prompt/domain-prompt.util";



export async function generateDomainMain(mainDir: string): Promise<void> {
  const domainName = await domainPromptInput();

  if (!domainName) {
    showInOutputChannel("My Extension Logs", 'Invalid domain name', true);
    return;
  }

  const className = capitalizeFirstLetter(domainName);
  const dataPath = `./domains/${domainName}`;

  try {
    const exists = await checkDirectoryExists(dataPath);

    if (exists) {
      showInOutputChannel("My Extension Logs", `Domain already exists: ${domainName}`);
      return;
    }

    await generateDataFiles({ name: domainName, className });
    await generateDomainFiles({ name: domainName, className });
    await showImportsDomainModule({ name: domainName, className });

    showInOutputChannel("My Extension Logs", `Files generated successfully!`);


  } catch (err) {
    showInOutputChannel("My Extension Logs", `Error generating domain files: ${err}`);
  }
}

