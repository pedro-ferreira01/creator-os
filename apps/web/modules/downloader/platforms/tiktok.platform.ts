import type { DownloadItem } from "../types";

import type {
  DownloaderPlatform,
} from "./downloader.platform";

import type {
  DownloadProcessorResult,
} from "../services/downloader.processor";

function isTikTokUrl(
  url: string
): boolean {
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

async function processTikTokDownload(
  download: DownloadItem
): Promise<DownloadProcessorResult> {
  const response = await fetch(
    `https://www.tiktok.com/oembed?url=${encodeURIComponent(
      download.url
    )}`
  );

  if (!response.ok) {
    throw new Error(
      "Não foi possível obter os dados do vídeo do TikTok."
    );
  }

  const data = (await response.json()) as {
    title?: string;
    thumbnail_url?: string;
    author_name?: string;
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
    `tiktok-${Date.now()}`;

  return {
    title,
    thumbnailUrl,
    fileName: `${safeTitle}.mp4`,
    fileUrl: null,
  };
}

export const tiktokPlatform: DownloaderPlatform = {
  platform: "TikTok",

  canHandle(
    url: string
  ): boolean {
    return isTikTokUrl(url);
  },

  async process(
    download: DownloadItem
  ): Promise<DownloadProcessorResult> {
    return processTikTokDownload(
      download
    );
  },
};