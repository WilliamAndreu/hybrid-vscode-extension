"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDomainMain = generateDomainMain;
const data_1 = require("./data");
const domain_1 = require("./domain");
const log_utils_1 = require("../../utils/logs/log.utils");
const check_directory_utils_1 = require("../../utils/directories/check_directory.utils");
const capitalize_utils_1 = require("../../utils/strings/capitalize.utils");
const domain_prompt_util_1 = require("../../services/prompt/domain-prompt.util");
async function generateDomainMain(mainDir) {
    const domainName = await (0, domain_prompt_util_1.domainPromptInput)();
    if (!domainName) {
        (0, log_utils_1.showInOutputChannel)("My Extension Logs", 'Invalid domain name', true);
        return;
    }
    const className = (0, capitalize_utils_1.capitalizeFirstLetter)(domainName);
    const dataPath = `./domains/${domainName}`;
    try {
        const exists = await (0, check_directory_utils_1.checkDirectoryExists)(dataPath);
        if (exists) {
            (0, log_utils_1.showInOutputChannel)("My Extension Logs", `Domain already exists: ${domainName}`);
            return;
        }
        await (0, data_1.generateDataFiles)({ name: domainName, className });
        await (0, domain_1.generateDomainFiles)({ name: domainName, className });
        await (0, log_utils_1.showImportsDomainModule)({ name: domainName, className });
        (0, log_utils_1.showInOutputChannel)("My Extension Logs", `Files generated successfully!`);
    }
    catch (err) {
        (0, log_utils_1.showInOutputChannel)("My Extension Logs", `Error generating domain files: ${err}`);
    }
}
//# sourceMappingURL=main.js.map