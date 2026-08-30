import type { DownloadItem } from "../types";

import type {
  DownloaderPlatform,
} from "./downloader.platform";

import type {
  DownloadProcessorResult,
} from "../services/downloader.processor";

function isFacebookUrl(
  url: string
): boolean {
  try {
    const parsedUrl = new URL(url);

    const hostname =
      parsedUrl.hostname.toLowerCase();

    return (
      hostname === "facebook.com" ||
      hostname === "www.facebook.com" ||
      hostname === "m.facebook.com" ||
      hostname === "fb.watch"
    );
  } catch {
    return false;
  }
}

async function processFacebookDownload(
  download: DownloadItem
): Promise<DownloadProcessorResult> {
  const response = await fetch(
    `https://www.facebook.com/plugins/video/oembed.json/?url=${encodeURIComponent(
      download.url
    )}`
  );

  if (!response.ok) {
    throw new Error(
      "Não foi possível obter os dados do conteúdo do Facebook."
    );
  }

  const data = (await response.json()) as {
    title?: string;
    author_name?: string;
    thumbnail_url?: string;
  };

  const title =
    typeof data.title === "string"
      ? data.title
      : null;

  const thumbnailUrl =
    typeof data.thumbnail_url === "string"
      ? data.thumbnail_url
      : null;

  const safeTitle =
    title
      ?.replace(/[<>:"/\\|?*]/g, "")
      .trim() ||
    `facebook-${Date.now()}`;

  return {
    title,
    thumbnailUrl,
    fileName: `${safeTitle}.mp4`,
    fileUrl: null,
  };
}

export const facebookPlatform: DownloaderPlatform = {
  platform: "Facebook",

  canHandle(
    url: string
  ): boolean {
    return isFacebookUrl(url);
  },

  async process(
    download: DownloadItem
  ): Promise<DownloadProcessorResult> {
    return processFacebookDownload(
      download
    );
  },
};