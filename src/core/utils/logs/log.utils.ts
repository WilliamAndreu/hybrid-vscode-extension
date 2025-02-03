import * as vscode from "vscode";

export function showImportsDomainModule(domain: { name: string; className: string }): void {
    const titleImports = ` To use the domain you must add these imports in the data.module.ts file:`;
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

    // console.log(titleImports);
    // console.log(consoleImports);
    // console.log(titleModuleImp);
    // console.log(moduleImp);

    showInOutputChannel("My Extension Logs", titleImports, true);
    showInOutputChannel("My Extension Logs", consoleImports);
    showInOutputChannel("My Extension Logs", titleModuleImp);
    showInOutputChannel("My Extension Logs", moduleImp);

}


const outputChannels: { [key: string]: vscode.OutputChannel } = {};

export function showInOutputChannel(channelName: string, message: string, clearBeforeShow: boolean = false): void {
    // Verifica si ya existe un canal con este nombre
    let outputChannel = outputChannels[channelName];
    
    if (!outputChannel) {
        // Si no existe, créalo y guárdalo
        outputChannel = vscode.window.createOutputChannel(channelName);
        outputChannels[channelName] = outputChannel;
    }
     // Opcional: Limpiar el canal antes de mostrar el mensaje
     if (clearBeforeShow) {
        outputChannel.clear();
    }
  

     outputChannel.appendLine(message);

     outputChannel.show(true); 
}