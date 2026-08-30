import { NextResponse } from "next/server";

import { downloaderService } from "@/modules/downloader/services/downloader.service";

import {
  processDownload,
} from "@/modules/downloader/services/downloader.processor";

import type {
  CreateDownloadInput,
  DownloadPlatform,
  DownloadItem,
} from "@/modules/downloader/types";

const VALID_PLATFORMS: DownloadPlatform[] = [
  "YouTube",
  "TikTok",
  "Instagram",
  "Facebook",
];

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as Partial<CreateDownloadInput>;

    // ==========================
    // Validar URL
    // ==========================

    if (
      typeof body.url !== "string" ||
      !body.url.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "A URL do conteúdo é obrigatória.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // Validar plataforma
    // ==========================

    if (
      typeof body.platform !== "string" ||
      !VALID_PLATFORMS.includes(
        body.platform as DownloadPlatform
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Plataforma de download inválida.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // Criar entrada
    // ==========================

    const input: CreateDownloadInput = {
      url: body.url.trim(),
      platform:
        body.platform as DownloadPlatform,
    };

    const download =
      downloaderService.createDownload(input);

    // ==========================
    // Processar
    // ==========================

    try {
      const result =
        await processDownload(download);

      const processedDownload: DownloadItem = {
        ...download,

        title: result.title,

        thumbnailUrl:
          result.thumbnailUrl,

        fileName:
          result.fileName,

        fileUrl:
          result.fileUrl,

        status: "Concluído",

        progress: 100,

        errorMessage: null,

        updatedAt:
          new Date().toISOString(),
      };

      return NextResponse.json(
        {
          data: processedDownload,
        },
        { status: 201 }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Não foi possível processar o download.";

      const failedDownload: DownloadItem = {
        ...download,

        status: "Erro",

        progress: 0,

        errorMessage,

        updatedAt:
          new Date().toISOString(),
      };

      return NextResponse.json(
        {
          data: failedDownload,

          error: errorMessage,
        },
        { status: 422 }
      );
    }
  } catch {
    return NextResponse.json(
      {
        error:
          "Não foi possível criar o download.",
      },
      { status: 500 }
    );
  }
}