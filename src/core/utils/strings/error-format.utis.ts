export function formatError(texto: string): string {

    if (typeof texto !== 'string') {
        throw new Error("El input debe ser una cadena de texto.");
    }

    const resultado = texto.replace(/Error:\s*/gi, '');

    return resultado.trim();
}