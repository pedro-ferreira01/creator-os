import type {
  DownloadPlatform,
} from "../types";

import type {
  DownloaderPlatform,
} from "./downloader.platform";

import { youtubePlatform } from "./youtube.platform";
import { tiktokPlatform } from "./tiktok.platform";
import { instagramPlatform } from "./instagram.platform";
import { facebookPlatform } from "./facebook.platform";

export const downloaderPlatforms: DownloaderPlatform[] = [
  youtubePlatform,
  tiktokPlatform,
  instagramPlatform,
  facebookPlatform,
];

export function getPlatformAdapter(
  platform: DownloadPlatform
): DownloaderPlatform | undefined {
  return downloaderPlatforms.find(
    (adapter) =>
      adapter.platform === platform
  );
}

export function findPlatformAdapter(
  url: string
): DownloaderPlatform | undefined {
  return downloaderPlatforms.find(
    (adapter) =>
      adapter.canHandle(url)
  );
}