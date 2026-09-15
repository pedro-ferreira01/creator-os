import type { DownloadItem } from "../types";

import type {
  DownloaderPlatform,
} from "./downloader.platform";

import { ExternalDownloaderProvider } from "../services/external-downloader.provider";

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

const externalDownloaderProvider =
  new ExternalDownloaderProvider();

export const youtubePlatform: DownloaderPlatform = {
  platform: "YouTube",

  canHandle(url: string): boolean {
    return isYouTubeUrl(url);
  },

  async process(
    download: DownloadItem
  ) {
    return externalDownloaderProvider.process(
      download
    );
  },
};