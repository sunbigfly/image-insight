/** Compatibility boundary for heterogeneous persisted sessions and third-party model payloads.
 * Keep this separate from the strict Reddit and loader contracts; narrow fields as their owners migrate.
 */
export type MediaRecord = Record<string, any>;
export interface FontOverrides { alias?: string; cssValue?: string; previewCss?: string; source?: string; fullName?: string }
export interface SubtitleOptions { language?: string; trackLabel?: string; sourceUrl?: string }
export interface ApiOptions {
  baseUrl?: string; apiKey?: string; method?: string; body?: unknown; track?: boolean;
  conversation?: MediaRecord; kind?: string;
  onEvent?: (...args: any[]) => void; onDelta?: (...args: any[]) => void; onTransport?: (...args: any[]) => void;
}
export interface StageOptions { streaming?: boolean; deepClueLoading?: boolean; deepClueProgress?: string }
export interface SiteRule { urlPattern?: string; containerSelector?: string; titleSelector?: string; authorSelector?: string; bodySelector?: string; captionSelector?: string }
export type DecodedBitmap = ImageBitmap | (HTMLImageElement & { close?(): void });

export interface MediaError extends Error { status?: number; code?: string; cancelled?: boolean }
