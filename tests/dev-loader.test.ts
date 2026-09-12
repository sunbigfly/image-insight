import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
const root = new URL('../', import.meta.url);
const loader = readFileSync(new URL('dev.user.js', root), 'utf8');
describe('native local-file loader', () => {
  it('points at the actual Windows build with a fixed URL and no query version', () => {
    const value = loader.match(/^\/\/ @require\s+(\S+)$/m)?.[1];
    expect(value).toBeDefined();
    const url = new URL(value ?? '');
    expect(url.protocol).toBe('file:'); expect(url.search).toBe(''); expect(url.hash).toBe('');
    const path = decodeURIComponent(url.pathname).replace(/^\/([A-Z]):\//, (_match, drive: string) => `/mnt/${drive.toLowerCase()}/`);
    expect(path).toBe(fileURLToPath(new URL('main.js', root)));
    expect(existsSync(path)).toBe(true);
  });
  it('delegates execution to Tampermonkey without HTTP or dynamic code evaluation', () => {
    expect(loader).not.toMatch(/https?:\/\/127\.0\.0\.1|https?:\/\/localhost|new Function|\beval\s*\(|GM_xmlhttpRequest\s*\(/);
    expect(loader).toContain('// @namespace    local.image-insight.dev');
    expect(loader).toContain('// @grant        GM_getValue');
  });
  it('loads a complete build with the original grants and no server dependency', () => {
    const main = readFileSync(new URL('main.js', root), 'utf8');
    expect(main.startsWith('// ==UserScript==')).toBe(true);
    expect(main).toContain('图像深读');
    expect(main).not.toContain('Reddit 按需翻译');
    expect(main.includes('redditTranslationController')).toBe(false);
    expect(main).not.toContain('image-insight-dev:v1');
  });
});
