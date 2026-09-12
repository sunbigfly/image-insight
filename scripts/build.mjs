import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { URL, fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { buildOptions } from './build-options.mjs';
const result = await build(await buildOptions());
const code = result.outputFiles[0]?.text;
if (!code) throw new Error('No bundled script');
const metadata = (await readFile(new URL('../src/userscript.meta.txt', import.meta.url), 'utf8')).trim();
const artifact = `${metadata}\n\n/* Generated from src/app.ts. Do not edit this artifact. MIT (c) 2026 sunbigfly. */\n${code}`;
await writeFile(new URL('../main.js', import.meta.url), artifact);
console.log(JSON.stringify({ artifact: 'main.js', bytes: Buffer.byteLength(artifact), sha256: createHash('sha256').update(artifact).digest('hex') }));

const loader = await build({ entryPoints: [fileURLToPath(new URL('../src/dev-entry.ts', import.meta.url))], bundle: true, format: 'iife', platform: 'browser', target: ['chrome120'], charset: 'utf8', write: false });
const mainPath = fileURLToPath(new URL('../main.js', import.meta.url));
const mount = mainPath.match(/^\/mnt\/([a-z])\/(.+)$/i);
const localMainUrl = mount
  ? `file:///${mount[1].toUpperCase()}:/${mount[2].split('/').map(encodeURIComponent).join('/')}`
  : pathToFileURL(mainPath).href;
const loaderMetadata = (await readFile(new URL('../src/dev.meta.txt', import.meta.url), 'utf8')).trim().replace('__LOCAL_MAIN_FILE__', localMainUrl);
await writeFile(new URL('../dev.user.js', import.meta.url), `${loaderMetadata}\n\n${loader.outputFiles[0].text}`);
