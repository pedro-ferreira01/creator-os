import type {
  DownloadItem,
} from "../types";

import type {
  DownloaderPlatform,
} from "./downloader.platform";

import type {
  DownloadProcessorResult,
} from "../services/downloader.processor";

function isYouTubeUrl(
  url: string
): boolean {
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

function getVideoId(
  url: string
): string | null {
  try {
    const parsedUrl = new URL(url);

    const hostname =
      parsedUrl.hostname.toLowerCase();

    if (
      hostname === "youtu.be" ||
      hostname === "www.youtu.be"
    ) {
      return (
        parsedUrl.pathname
          .replace("/", "")
          .trim() || null
      );
    }

    return (
      parsedUrl.searchParams.get("v")
        ?.trim() || null
    );
  } catch {
    return null;
  }
}

async function processYouTubeDownload(
  download: DownloadItem
): Promise<DownloadProcessorResult> {
  const videoId = getVideoId(
    download.url
  );

  if (!videoId) {
    throw new Error(
      "Não foi possível identificar o vídeo do YouTube."
    );
  }

  const response = await fetch(
    `https://www.youtube.com/oembed?url=${encodeURIComponent(
      download.url
    )}&format=json`
  );

  if (!response.ok) {
    throw new Error(
      "Não foi possível obter os dados do vídeo do YouTube."
    );
  }

  const data = (await response.json()) as {
    title?: string;
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
      .trim() || `youtube-${videoId}`;

  return {
    title,
    thumbnailUrl,
    fileName: `${safeTitle}.mp4`,
    fileUrl: null,
  };
}

export const youtubePlatform: DownloaderPlatform = {
  platform: "YouTube",

  canHandle(
    url: string
  ): boolean {
    return isYouTubeUrl(url);
  },

  async process(
    download: DownloadItem
  ): Promise<DownloadProcessorResult> {
    return processYouTubeDownload(
      download
    );
  },
};