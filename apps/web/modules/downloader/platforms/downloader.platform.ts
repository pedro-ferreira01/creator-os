import type {
  DownloadItem,
  DownloadPlatform,
} from "../types";

import type {
  DownloadProcessorResult,
} from "../services/downloader.processor";

export interface DownloaderPlatform {
  platform: DownloadPlatform;

  canHandle(url: string): boolean;

  process(
    download: DownloadItem
  ): Promise<DownloadProcessorResult>;
}