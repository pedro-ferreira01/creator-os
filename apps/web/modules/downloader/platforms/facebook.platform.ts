import type {
  DownloadItem,
} from "../types";

import type {
  DownloadProcessorResult,
} from "../services/downloader.result";

import type {
  DownloaderPlatform,
} from "./downloader.platform";

import {
  ExternalDownloaderProvider,
} from "../services/external-downloader.provider";

const provider =
  new ExternalDownloaderProvider();

function isFacebookUrl(
  url: string
): boolean {
  try {
    const parsedUrl =
      new URL(url);

    const hostname =
      parsedUrl.hostname
        .toLowerCase()
        .replace(/^www\./, "");

    return (
      hostname === "facebook.com" ||
      hostname === "fb.com" ||
      hostname === "fb.watch" ||
      hostname.endsWith(
        ".facebook.com"
      )
    );
  } catch {
    return false;
  }
}

export const facebookPlatform: DownloaderPlatform =
  {
    platform: "Facebook",

    canHandle(
      url: string
    ): boolean {
      return isFacebookUrl(url);
    },

    async process(
      download: DownloadItem
    ): Promise<DownloadProcessorResult> {
      return provider.process(
        download
      );
    },
  };