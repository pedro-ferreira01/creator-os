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
  downloadedFileUrl?: string;
  fileKey?: string;
  audioOnlyUrl?: string;
  videoOnlyUrl?: string;
};

type ApifyDatasetItem = {
  result?: ApifyResult;
  downloadedFileUrl?: string;
  fileKey?: string;
  audioOnlyUrl?: string;
  videoOnlyUrl?: string;
};

type ApifyRunResponse = {
  data?: {
    id?: string;
    status?: string;
    defaultDatasetId?: string;
  };
};

type ApifyDatasetResponse = ApifyDatasetItem[];

const TERMINAL_RUN_STATUSES = [
  "SUCCEEDED",
  "FAILED",
  "ABORTED",
  "TIMED-OUT",
];

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
      download.platform ===
      "YouTube"
    ) {
      return this.startYouTubeRun(
        download
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

    return this.processFacebook(
      download
    );
  }

  async getYouTubeRun(
    runId: string
  ): Promise<{
    status: string;
    datasetId: string | null;
  }> {
    if (!apifyConfig.apiToken) {
      throw new Error(
        "APIFY_API_TOKEN não configurado."
      );
    }

    const endpoint =
      `${apifyConfig.apiBaseUrl}/actor-runs/${encodeURIComponent(
        runId
      )}?token=${encodeURIComponent(
        apifyConfig.apiToken
      )}`;

    const response = await fetch(
      endpoint,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      throw new Error(
        `Apify retornou erro ${response.status}: ${errorText}`
      );
    }

    const run =
      (await response.json()) as ApifyRunResponse;

    const status =
      run.data?.status;

    if (!status) {
      throw new Error(
        "O Apify não retornou o status do Run."
      );
    }

    return {
      status,
      datasetId:
        run.data?.defaultDatasetId ??
        null,
    };
  }

  async getYouTubeResult(
    datasetId: string,
    downloadId: string
  ): Promise<DownloadProcessorResult> {
    if (!apifyConfig.apiToken) {
      throw new Error(
        "APIFY_API_TOKEN não configurado."
      );
    }

    const endpoint =
      `${apifyConfig.apiBaseUrl}/datasets/${encodeURIComponent(
        datasetId
      )}/items?token=${encodeURIComponent(
        apifyConfig.apiToken
      )}`;

    const response = await fetch(
      endpoint,
      {
        method: "GET",
        cache: "no-store",
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
      (await response.json()) as ApifyDatasetResponse;

    const firstItem =
      dataset[0];

    if (!firstItem) {
      throw new Error(
        "O Apify concluiu o processamento, mas não retornou nenhum resultado."
      );
    }

    const result =
      firstItem.result;

    const downloadedFileUrl =
      firstItem.downloadedFileUrl ??
      result?.downloadedFileUrl ??
      null;

    if (!downloadedFileUrl) {
      throw new Error(
        "O Apify concluiu o processamento, mas não retornou a URL do vídeo."
      );
    }

    return {
      title:
        result?.title ??
        null,

      thumbnailUrl:
        result?.thumbnail ??
        null,

      fileName:
        `youtube-${downloadId}.mp4`,

      fileUrl:
        downloadedFileUrl,

      apifyRunId:
        null,
    };
  }

  isTerminalRunStatus(
    status: string
  ): boolean {
    return TERMINAL_RUN_STATUSES.includes(
      status
    );
  }

  isSuccessfulRunStatus(
    status: string
  ): boolean {
    return status === "SUCCEEDED";
  }

  private async startYouTubeRun(
    download: DownloadItem
  ): Promise<DownloadProcessorResult> {
    const actorId =
      apifyConfig.actors.youtube;

    const endpoint =
      `${apifyConfig.apiBaseUrl}/acts/${actorId}/runs?token=${encodeURIComponent(
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
          storeInKVStore: false,
          videos: [
            {
              url: download.url,
            },
          ],
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

    const run =
      (await response.json()) as ApifyRunResponse;

    const runId =
      run.data?.id;

    if (!runId) {
      throw new Error(
        "O Apify iniciou o processamento, mas não retornou o ID do Run."
      );
    }

    return {
      title: null,
      thumbnailUrl: null,
      fileName: null,
      fileUrl: null,
      apifyRunId: runId,
    };
  }

  private async processFacebook(
    download: DownloadItem
  ): Promise<DownloadProcessorResult> {
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

      apifyRunId: null,
    };
  }
}