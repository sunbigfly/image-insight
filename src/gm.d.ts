interface GmResponse<T = unknown> {
  status: number; responseText: string; finalUrl?: string; responseHeaders?: string;
  response?: T; readyState?: number;
}
interface GmRequestOptions {
  method?: string; url: string; headers?: Record<string, string>; data?: string | Blob | FormData;
  timeout?: number; anonymous?: boolean; nocache?: boolean; fetch?: boolean;
  responseType?: string; overrideMimeType?: string;
  onload?: (response: GmResponse) => void;
  onerror?: (response?: GmResponse) => void; ontimeout?: () => void; onabort?: () => void;
  onprogress?: (response: GmResponse) => void; onloadstart?: (response: GmResponse) => void;
  onreadystatechange?: (response: GmResponse) => void;
}
declare function GM_xmlhttpRequest(options: GmRequestOptions): { abort(): void };
declare namespace GM_xmlhttpRequest { const RESPONSE_TYPE_STREAM: string | undefined }
declare function GM_getValue<T>(key: string, fallback: T): T;
declare function GM_setValue(key: string, value: unknown): void;
declare function GM_deleteValue(key: string): void;
declare function GM_registerMenuCommand(label: string, action: () => void): number;
declare function GM_unregisterMenuCommand(id: number): void;
declare const unsafeWindow: Window & typeof globalThis;
declare module '*.css' { const text: string; export default text; }
