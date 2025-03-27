import * as vscode from "vscode";
import { environment } from "../../environments/environment";
import { formatError } from "../strings/error-format.utis";

export function showImportsDomainModule(domain: { name: string; className: string }): void {
    const titleImports = `To use the domain you must add these imports in the data.module.ts file:`;
    const titleModuleImp = `Module implementation:`;

    const consoleImports = `
    import { Get${domain.className}UseCase } from "@usecases/${domain.name}/get-${domain.name}.usecase";
    import { ${domain.className}Repository } from "@repositories/${domain.name}/${domain.name}.repository";
    import { ${domain.className}RemoteDataSource } from "@data/datasource/${domain.name}/source/${domain.name}-remote-datasource";
    import { ${domain.className}ImpRepository } from "@data/repositories/${domain.name}/${domain.name}-implementation.repository";
    import { ${domain.className}RemoteDataSourceImp } from "@data/datasource/${domain.name}/remote/${domain.name}-remote-datasource-imp";
    import { ${domain.className}LocalDataSourceImp } from "@data/datasource/${domain.name}/local/${domain.name}-local-datasource-imp";
    import { ${domain.className}LocalDataSource } from "@data/datasource/${domain.name}/source/${domain.name}-local-datasource";

`;

    const moduleImp = `
         Get${domain.className}UseCase,
         { provide: ${domain.className}Repository, useClass: ${domain.className}ImpRepository },
         { provide: ${domain.className}RemoteDataSource, useClass: ${domain.className}RemoteDataSourceImp },
         { provide: ${domain.className}LocalDataSource, useClass: ${domain.className}LocalDataSourceImp },

    `;

    showInOutputChannel(titleImports);
    showInOutputChannel(consoleImports);
    showInOutputChannel(titleModuleImp);
    showInOutputChannel(moduleImp);

}


const outputChannels: { [key: string]: vscode.OutputChannel } = {};

export function showInOutputChannel( message: string,  isError: boolean = false, clearBeforeShow: boolean = false,): void {
    let outputChannel = outputChannels[environment.OUPUT_ID];

    if (!outputChannel) {
        outputChannel = vscode.window.createOutputChannel(environment.OUPUT_ID);
        outputChannels[environment.OUPUT_ID] = outputChannel;
    }

    if (clearBeforeShow) {
        outputChannel.clear();
    }
    isError ? outputChannel.appendLine(formatError(message)) : outputChannel.appendLine(`${message}`);
    outputChannel.show(true);
}

