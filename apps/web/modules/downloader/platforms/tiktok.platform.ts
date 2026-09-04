import type { DownloadItem } from "../types";

import type {
  DownloaderPlatform,
} from "./downloader.platform";

function isTikTokUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    const hostname =
      parsedUrl.hostname.toLowerCase();

    return (
      hostname === "tiktok.com" ||
      hostname === "www.tiktok.com" ||
      hostname.endsWith(".tiktok.com")
    );
  } catch {
    return false;
  }
}

export const tiktokPlatform: DownloaderPlatform = {
  platform: "TikTok",

  canHandle(url: string): boolean {
    return isTikTokUrl(url);
  },

  async process(
    download: DownloadItem
  ) {
    throw new Error(
      `Provider do TikTok ainda não configurado para o download ${download.id}.`
    );
  },
};