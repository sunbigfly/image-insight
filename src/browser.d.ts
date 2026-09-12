interface Window {
  queryLocalFonts?: () => Promise<Array<{ family: string; fullName: string; postscriptName: string; style: string }>>;
  webkitAudioContext?: typeof AudioContext;
}
interface Document { webkitFullscreenElement?: Element | null; webkitExitFullscreen?: () => Promise<void> }
// Chromium WebCodecs ImageDecoder is not included in TypeScript's current DOM library.
declare class ImageDecoder {
  constructor(options: { data: BufferSource; type: string; preferAnimation?: boolean });
  static isTypeSupported(type: string): Promise<boolean>;
  tracks: { ready: Promise<void>; selectedTrack: { frameCount: number; animated: boolean } };
  decode(options: { frameIndex: number; completeFramesOnly?: boolean }): Promise<{ image: VideoFrame }>;
  close(): void;
}
