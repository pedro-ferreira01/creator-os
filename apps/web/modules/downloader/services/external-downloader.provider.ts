import type { DownloadItem } from "../types";

import {
  apifyConfig,
} from "../config/apify.config";

import type {
  DownloadProcessorResult,
} from "./downloader.result";

import type {
  DownloaderProvider,
} from "./downloader.provider";

type ApifyMedia = {
  url?: string;
  quality?: string;
  type?: string;
  extension?: string;
};

type ApifyResult = {
  title?: string;
  thumbnail?: string;
  medias?: ApifyMedia[];
};

type ApifyDatasetItem = {
  result?: ApifyResult;
};

export class ExternalDownloaderProvider
  implements DownloaderProvider
{
  async process(
    download: DownloadItem
  ): Promise<DownloadProcessorResult> {
    if (!apifyConfig.apiToken) {
      throw new Error(
        "APIFY_API_TOKEN não configurado."
      );
    }

    if (
      download.platform !==
      "Facebook"
    ) {
      throw new Error(
        `Provedor Apify ainda não configurado para ${download.platform}.`
      );
    }

    const actorId =
      apifyConfig.actors.facebook;

    const endpoint =
      `${apifyConfig.apiBaseUrl}/acts/${actorId}/run-sync-get-dataset-items?token=${encodeURIComponent(
        apifyConfig.apiToken
      )}`;

    const response = await fetch(
      endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          proxyConfiguration: {
            useApifyProxy: false,
            proxyUrls: [],
          },
          url: download.url,
        }),
      }
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      throw new Error(
        `Apify retornou erro ${response.status}: ${errorText}`
      );
    }

    const dataset =
      (await response.json()) as ApifyDatasetItem[];

    const firstItem =
      dataset[0];

    const result =
      firstItem?.result;

    if (!result) {
      throw new Error(
        "O Apify não retornou um resultado válido."
      );
    }

    const videos =
      (result.medias ?? []).filter(
        (media) =>
          media.type === "video" &&
          typeof media.url ===
            "string" &&
          media.url.length > 0
      );

    if (!videos.length) {
      throw new Error(
        "O Apify não encontrou um arquivo de vídeo para este conteúdo."
      );
    }

    const selectedVideo =
      videos.find(
        (media) =>
          media.quality
            ?.toLowerCase()
            .includes("hd")
      ) ??
      videos[0];

    if (
      !selectedVideo?.url
    ) {
      throw new Error(
        "Não foi possível obter a URL do vídeo."
      );
    }

    return {
      title:
        result.title ?? null,

      thumbnailUrl:
        result.thumbnail ?? null,

      fileName:
        `facebook-${download.id}.mp4`,

      fileUrl:
        selectedVideo.url,
    };
  }
}