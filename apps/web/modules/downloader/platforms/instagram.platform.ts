import type { DownloadItem } from "../types";

import type {
  DownloaderPlatform,
} from "./downloader.platform";

import type {
  DownloadProcessorResult,
} from "../services/downloader.processor";

function isInstagramUrl(
  url: string
): boolean {
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

async function processInstagramDownload(
  download: DownloadItem
): Promise<DownloadProcessorResult> {
  const response = await fetch(
    `https://www.instagram.com/oembed/?url=${encodeURIComponent(
      download.url
    )}`
  );

  if (!response.ok) {
    throw new Error(
      "Não foi possível obter os dados do conteúdo do Instagram."
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
    `instagram-${Date.now()}`;

  return {
    title,
    thumbnailUrl,
    fileName: `${safeTitle}.mp4`,
    fileUrl: null,
  };
}

export const instagramPlatform: DownloaderPlatform = {
  platform: "Instagram",

  canHandle(
    url: string
  ): boolean {
    return isInstagramUrl(url);
  },

  async process(
    download: DownloadItem
  ): Promise<DownloadProcessorResult> {
    return processInstagramDownload(
      download
    );
  },
};