import type { DownloadItem } from "../types";

import type {
  DownloadProcessorResult,
} from "./downloader.result";

export interface DownloaderProvider {
  process(
    download: DownloadItem
  ): Promise<DownloadProcessorResult>;
}