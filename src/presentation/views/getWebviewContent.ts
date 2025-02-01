export function getWebviewContent(title: string): string {
    return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
            h1 { color: #007acc; }
            button { 
                padding: 10px 20px; 
                font-size: 16px; 
                background-color: #007acc; 
                color: white; 
                border: none; 
                cursor: pointer; 
                margin-top: 20px; 
                border-radius: 5px;
            }
            button:hover { background-color: #005fa3; }
        </style>
    </head>
    <body>
        <h1>${title}</h1>
        <p>Bienvenido a la sección de <strong>${title}</strong>.</p>
        <button onclick="sendMessage()">Presionar botón</button>
        <script>
            const vscode = acquireVsCodeApi();
            function sendMessage() {
                vscode.postMessage({ command: 'showMessage' });
            }
        </script>
    </body>
    </html>`;
}