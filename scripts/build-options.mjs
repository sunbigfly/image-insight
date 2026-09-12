import { fileURLToPath, URL } from 'node:url';
export const root = fileURLToPath(new URL('..', import.meta.url));
export async function buildOptions(development = false) {
  return {
    absWorkingDir: root, entryPoints: ['src/app.ts'], bundle: true, format: 'iife', platform: 'browser',
    target: ['chrome120', 'edge120'], treeShaking: true, minify: false,
    sourcemap: development ? 'inline' : false, sourcesContent: development,
    legalComments: 'inline', charset: 'utf8', write: false,
    loader: { '.css': 'text' },
  };
}
