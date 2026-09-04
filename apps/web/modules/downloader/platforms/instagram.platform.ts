import type { DownloadItem } from "../types";

import type {
  DownloaderPlatform,
} from "./downloader.platform";

function isInstagramUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    const hostname =
      parsedUrl.hostname.toLowerCase();

    return (
      hostname === "instagram.com" ||
      hostname === "www.instagram.com" ||
      hostname === "m.instagram.com"
    );
  } catch {
    return false;
  }
}

export const instagramPlatform: DownloaderPlatform = {
  platform: "Instagram",

  canHandle(url: string): boolean {
    return isInstagramUrl(url);
  },

  async process(
    download: DownloadItem
  ) {
    throw new Error(
      `Provider do Instagram ainda não configurado para o download ${download.id}.`
    );
  },
};