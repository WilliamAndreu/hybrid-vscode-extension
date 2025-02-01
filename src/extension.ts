import * as vscode from 'vscode';
import { FrameworkDataProvider } from './infrastructure/providers/FrameworkDataProvider';
import { registerOpenWebviewCommand } from './infrastructure/commands/OpenWebviewCommand';
import { registerShowProjectPathCommand } from './infrastructure/commands/ShowProjectPathCommand';

export function activate(context: vscode.ExtensionContext) {
  console.log('Extensión activada');

  const frameworkDataProvider = new FrameworkDataProvider();
  vscode.window.registerTreeDataProvider('frameworkSelector', frameworkDataProvider);

  registerOpenWebviewCommand(context);
  registerShowProjectPathCommand(context);
}

export function deactivate() { }