import type { DownloadItem } from "../types";

import type {
  DownloaderProvider,
} from "./downloader.provider";

import {
  findPlatformAdapter,
} from "../platforms";

export type DownloadProcessorResult = {
  title: string | null;
  thumbnailUrl: string | null;
  fileName: string | null;
  fileUrl: string | null;
};

class PlatformDownloaderProvider
  implements DownloaderProvider
{
  async process(
    download: DownloadItem
  ): Promise<DownloadProcessorResult> {
    const adapter =
      findPlatformAdapter(download.url);

    if (!adapter) {
      throw new Error(
        "Não foi possível identificar a plataforma desta URL."
      );
    }

    if (
      adapter.platform !== download.platform
    ) {
      throw new Error(
        `A URL informada não pertence à plataforma ${download.platform}.`
      );
    }

    return adapter.process(download);
  }
}

export const downloaderProvider =
  new PlatformDownloaderProvider();

export async function processDownload(
  download: DownloadItem
): Promise<DownloadProcessorResult> {
  return downloaderProvider.process(
    download
  );
}