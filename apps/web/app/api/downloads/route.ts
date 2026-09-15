import { NextResponse } from "next/server";

import {
  createSupabaseServerClient,
} from "@/lib/supabase/server";

import { downloaderRepository } from "@/modules/downloader/services/downloader.repository";

import {
  processDownload,
} from "@/modules/downloader/services/downloader.processor";

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

export async function GET() {
  try {
    // ==========================
    // Autenticação
    // ==========================

    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error:
            "Usuário não autenticado.",
        },
        { status: 401 }
      );
    }

    // ==========================
    // Buscar downloads do usuário
    // ==========================

    const downloads =
      await downloaderRepository.findAllByUser(
        supabase,
        user.id
      );

    return NextResponse.json(
      {
        data: downloads,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Não foi possível carregar os downloads.";

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // ==========================
    // Autenticação
    // ==========================

    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error:
            "Usuário não autenticado.",
        },
        { status: 401 }
      );
    }

    // ==========================
    // Ler body
    // ==========================

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

    const input: CreateDownloadInput = {
      url: body.url.trim(),
      platform:
        body.platform as DownloadPlatform,
    };

    // ==========================
    // Criar no Supabase
    // ==========================

    const download =
      await downloaderRepository.create(
        supabase,
        {
          userId: user.id,
          url: input.url,
          platform: input.platform,
        }
      );

    // ==========================
    // Processar download
    // ==========================

    try {
      await downloaderRepository.update(
        supabase,
        download.id,
        {
          status: "Processando",
          progress: 0,
        }
      );

      const result =
        await processDownload(download);

      // ==========================
      // Processamento assíncrono
      // ==========================

      if (result.apifyRunId) {
        const processingDownload =
          await downloaderRepository.update(
            supabase,
            download.id,
            {
              status: "Processando",
              progress: 0,
              apify_run_id:
                result.apifyRunId,
            }
          );

        return NextResponse.json(
          {
            data: processingDownload,
          },
          { status: 201 }
        );
      }

      // ==========================
      // Processamento síncrono
      // ==========================

      const completedDownload =
        await downloaderRepository.update(
          supabase,
          download.id,
          {
            title: result.title,
            thumbnail_url:
              result.thumbnailUrl,
            file_name:
              result.fileName,
            file_url:
              result.fileUrl,
            status: "Concluído",
            progress: 100,
            apify_run_id: null,
          }
        );

      return NextResponse.json(
        {
          data: completedDownload,
        },
        { status: 201 }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Não foi possível processar o download.";

      console.error(
        "Erro ao processar download:",
        error
      );

      const failedDownload =
        await downloaderRepository.update(
          supabase,
          download.id,
          {
            status: "Erro",
            progress: 0,
            apify_run_id: null,
          }
        );

      return NextResponse.json(
        {
          data: failedDownload,
          error: errorMessage,
        },
        { status: 422 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Não foi possível criar o download.";

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}