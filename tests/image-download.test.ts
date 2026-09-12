import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { describe, expect, it, vi } from 'vitest';

const source = ts.createSourceFile('app.ts', readFileSync(new URL('../src/app.ts', import.meta.url), 'utf8'), ts.ScriptTarget.Latest, true);
const functions = new Map<string, string>();
function collect(node: ts.Node): void {
  if (ts.isFunctionDeclaration(node) && node.name) functions.set(node.name.text, node.getText(source));
  ts.forEachChild(node, collect);
}
collect(source);

interface InspectedImage { source: string; blob: Blob; sha256: string; isGif: boolean }
interface ImageFunctions {
  normalizeDownloadedImageBlob: (blob: Blob) => Promise<Blob>;
  inspectImage: (image: object) => Promise<InspectedImage>;
}
function harness(primary = 'original', fallback = 'rendered') {
  const sourceToBlob = vi.fn<(url: string) => Promise<Blob>>();
  const names = ['normalizeDownloadedImageBlob', 'blobIsGif', 'inspectImage'];
  const code = ts.transpileModule(names.map((name) => {
    const value = functions.get(name);
    if (!value) throw new Error(`Missing source function: ${name}`);
    return value;
  }).join('\n'), { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
  const api = runInNewContext(`${code}\n({ normalizeDownloadedImageBlob, inspectImage })`, {
    Blob, Uint8Array, DataView, TextDecoder, sourceToBlob,
    getImageSource: () => primary,
    getImageFallbackSource: () => fallback,
    assertAnalysisTaskActive: () => undefined,
    sha256Hex: () => Promise.resolve('content-hash')
  }) as ImageFunctions;
  return { ...api, sourceToBlob };
}

const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64');

describe('mobile image downloads', () => {
  it.each(['', 'application/octet-stream', 'text/plain'])('recovers a PNG served as %s without changing its bytes', async (type) => {
    const { normalizeDownloadedImageBlob } = harness();
    const result = await normalizeDownloadedImageBlob(new Blob([png], { type }));
    expect(result.type).toBe('image/png');
    expect(Buffer.from(await result.arrayBuffer())).toEqual(png);
  });

  it.each([
    { bytes: [0xff, 0xd8, 0xff, 0xe0], type: 'image/jpeg' },
    { bytes: Array.from(Buffer.from('GIF89a')), type: 'image/gif' },
    { bytes: Array.from(Buffer.from('RIFF\x04\x00\x00\x00WEBP')), type: 'image/webp' },
    { bytes: [0, 0, 0, 20, ...Buffer.from('ftypavif'), 0, 0, 0, 0, ...Buffer.from('mif1')], type: 'image/avif' }
  ])('recognizes $type from its file header', async ({ bytes, type }) => {
    const result = await harness().normalizeDownloadedImageBlob(new Blob([new Uint8Array(bytes)]));
    expect(result.type).toBe(type);
  });

  it('keeps an existing image MIME type', async () => {
    const blob = new Blob([png], { type: 'image/png' });
    expect(await harness().normalizeDownloadedImageBlob(blob)).toBe(blob);
  });

  it.each(['<html>Login required</html>', '{"error":"denied"}', '', 'https://pbs.twimg.com/media/photo.jpg'])('rejects non-image data instead of inferring the format from a URL', async (body) => {
    await expect(harness().normalizeDownloadedImageBlob(new Blob([body]))).rejects.toThrow('目标地址返回的不是图片。');
  });

  it('retries the rendered image when the original URL returns an HTML page', async () => {
    const { inspectImage, sourceToBlob } = harness();
    sourceToBlob.mockResolvedValueOnce(new Blob(['<html>Not available</html>'], { type: 'text/html' }))
      .mockResolvedValueOnce(new Blob([png]));
    const result = await inspectImage({});
    expect(sourceToBlob.mock.calls.map(([url]) => url)).toEqual(['original', 'rendered']);
    expect(result.source).toBe('rendered');
    expect(result.blob.type).toBe('image/png');
    expect(result.isGif).toBe(false);
  });

  it('does not download a second time when the original image has an empty MIME type', async () => {
    const { inspectImage, sourceToBlob } = harness();
    sourceToBlob.mockResolvedValue(new Blob([png]));
    expect((await inspectImage({})).source).toBe('original');
    expect(sourceToBlob).toHaveBeenCalledTimes(1);
  });

  it('does not retry the same URL or accept a failed fallback', async () => {
    const same = harness('original', 'original');
    same.sourceToBlob.mockResolvedValue(new Blob(['<html>Error</html>']));
    await expect(same.inspectImage({})).rejects.toThrow('目标地址返回的不是图片。');
    expect(same.sourceToBlob).toHaveBeenCalledTimes(1);
    const fallback = harness();
    fallback.sourceToBlob.mockResolvedValue(new Blob(['<html>Error</html>']));
    await expect(fallback.inspectImage({})).rejects.toThrow('目标地址返回的不是图片。');
    expect(fallback.sourceToBlob).toHaveBeenCalledTimes(2);
  });
});
