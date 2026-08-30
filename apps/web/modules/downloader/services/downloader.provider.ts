import type { DownloadItem } from "../types";

import type {
  DownloadProcessorResult,
} from "./downloader.processor";

export interface DownloaderProvider {
  process(
    download: DownloadItem
  ): Promise<DownloadProcessorResult>;
}