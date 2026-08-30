import type { DownloadItem } from "../types";

import type {
  DownloadProcessorResult,
} from "./downloader.processor";

import type {
  DownloaderProvider,
} from "./downloader.provider";

export class ExternalDownloaderProvider
  implements DownloaderProvider
{
  async process(
    download: DownloadItem
  ): Promise<DownloadProcessorResult> {
    throw new Error(
      `Provedor externo ainda não configurado para ${download.platform}.`
    );
  }
}