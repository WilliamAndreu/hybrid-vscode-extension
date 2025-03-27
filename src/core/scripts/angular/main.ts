import { generateDomainFiles } from "./domain";
import { showImportsDomainModule, showInOutputChannel } from "../../utils/logs/log.utils";
import { checkDirectoryExists } from "../../utils/directories/check_directory.utils";
import { capitalizeFirstLetter } from "../../utils/strings/capitalize.utils";
import { domainPromptInput } from "../../services/prompt/domain-prompt.util";
import { generateDataFiles } from "./data";



export async function generateDomainMain(mainDir: string): Promise<void> {
  const domainName = await domainPromptInput();

  if (!domainName) {
    showInOutputChannel( 'Invalid domain name', true);
    return;
  }

  const className = capitalizeFirstLetter(domainName);
  const dataPath = `./domains/${domainName}`;

  try {
    const exists = await checkDirectoryExists(dataPath);

    if (exists) {
      showInOutputChannel( `Domain already exists: ${domainName}`);
      return;
    }

    await generateDataFiles({ name: domainName, className });
    // await generateDomainFiles({ name: domainName, className });
    // await showImportsDomainModule({ name: domainName, className });

    // showInOutputChannel( `✅ Files generated successfully!`);

  } catch (err) {

    showInOutputChannel( `❌ ${err}`, true);

  }
}

