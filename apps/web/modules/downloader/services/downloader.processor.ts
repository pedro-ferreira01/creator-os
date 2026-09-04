import type {
  DownloadItem,
} from "../types";

import {
  findPlatformAdapter,
} from "../platforms";

import type {
  DownloadProcessorResult,
} from "./downloader.result";

export async function processDownload(
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