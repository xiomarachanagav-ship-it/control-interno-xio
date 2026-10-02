import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const required = ['<!doctype html>', '<title>Gestión de Indicadores | Electrovera</title>', 'const INDICATORS =', 'function login()', 'localStorage'];

for (const token of required) {
  if (!html.includes(token)) throw new Error(`Falta el elemento requerido: ${token}`);
}

if (/"password"\s*:/.test(html)) {
  throw new Error('Se detectaron credenciales embebidas en el archivo publicado.');
}

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
if (scripts.length !== 1) throw new Error('Se esperaba exactamente un bloque de JavaScript inline.');

try {
  new Function(scripts[0]);
} catch (error) {
  throw new Error(`El JavaScript no se puede analizar: ${error.message}`);
}

console.log('Validación estática completada correctamente.');
