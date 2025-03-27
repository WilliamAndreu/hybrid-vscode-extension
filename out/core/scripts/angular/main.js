"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDomainMain = generateDomainMain;
const log_utils_1 = require("../../utils/logs/log.utils");
const check_directory_utils_1 = require("../../utils/directories/check_directory.utils");
const capitalize_utils_1 = require("../../utils/strings/capitalize.utils");
const domain_prompt_util_1 = require("../../services/prompt/domain-prompt.util");
const data_1 = require("./data");
async function generateDomainMain(mainDir) {
    const domainName = await (0, domain_prompt_util_1.domainPromptInput)();
    if (!domainName) {
        (0, log_utils_1.showInOutputChannel)('Invalid domain name', true);
        return;
    }
    const className = (0, capitalize_utils_1.capitalizeFirstLetter)(domainName);
    const dataPath = `./domains/${domainName}`;
    try {
        const exists = await (0, check_directory_utils_1.checkDirectoryExists)(dataPath);
        if (exists) {
            (0, log_utils_1.showInOutputChannel)(`Domain already exists: ${domainName}`);
            return;
        }
        await (0, data_1.generateDataFiles)({ name: domainName, className });
        // await generateDomainFiles({ name: domainName, className });
        // await showImportsDomainModule({ name: domainName, className });
        // showInOutputChannel( `✅ Files generated successfully!`);
    }
    catch (err) {
        (0, log_utils_1.showInOutputChannel)(`❌ ${err}`, true);
    }
}
//# sourceMappingURL=main.js.map