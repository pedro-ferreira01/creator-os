import { NextResponse } from "next/server";

import { downloaderService } from "@/modules/downloader/services/downloader.service";

import type {
  CreateDownloadInput,
  DownloadPlatform,
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

    const input: CreateDownloadInput = {
      url: body.url.trim(),
      platform:
        body.platform as DownloadPlatform,
    };

    const download =
      downloaderService.createDownload(input);

    return NextResponse.json(
      {
        data: download,
      },
      { status: 201 }
    );
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