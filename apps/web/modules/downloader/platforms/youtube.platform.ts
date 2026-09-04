import type { DownloadItem } from "../types";

import type {
  DownloaderPlatform,
} from "./downloader.platform";

function isYouTubeUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    const hostname =
      parsedUrl.hostname.toLowerCase();

    return (
      hostname === "youtube.com" ||
      hostname === "www.youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "youtu.be" ||
      hostname === "www.youtu.be"
    );
  } catch {
    return false;
  }
}

export const youtubePlatform: DownloaderPlatform = {
  platform: "YouTube",

  canHandle(url: string): boolean {
    return isYouTubeUrl(url);
  },

  async process(
    download: DownloadItem
  ) {
    throw new Error(
      `Provider do YouTube ainda não configurado para o download ${download.id}.`
    );
  },
};