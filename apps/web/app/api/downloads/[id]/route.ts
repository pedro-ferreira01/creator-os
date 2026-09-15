import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { downloaderRepository } from "@/modules/downloader/services/downloader.repository";

import { ExternalDownloaderProvider } from "@/modules/downloader/services/external-downloader.provider";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const externalDownloaderProvider =
  new ExternalDownloaderProvider();

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Não autenticado.",
        },
        { status: 401 }
      );
    }

    const download =
      await downloaderRepository.findById(
        supabase,
        id
      );

    if (!download) {
      return NextResponse.json(
        {
          error: "Download não encontrado.",
        },
        { status: 404 }
      );
    }

    /*
     * Downloads do YouTube são processados
     * de forma assíncrona pelo Apify.
     *
     * Enquanto o Run estiver ativo, apenas
     * retornamos o estado atual.
     */
    if (
      download.platform === "YouTube" &&
      download.apifyRunId &&
      download.status === "Processando"
    ) {
      const run =
        await externalDownloaderProvider.getYouTubeRun(
          download.apifyRunId
        );

      if (
        !externalDownloaderProvider.isTerminalRunStatus(
          run.status
        )
      ) {
        return NextResponse.json({
          data: download,
        });
      }

      /*
       * O Run terminou, mas não foi concluído
       * com sucesso.
       */
      if (
        !externalDownloaderProvider.isSuccessfulRunStatus(
          run.status
        )
      ) {
        const failedDownload =
          await downloaderRepository.update(
            supabase,
            download.id,
            {
              status: "Erro",
              progress: 0,
            }
          );

        return NextResponse.json({
          data: failedDownload,
        });
      }

      /*
       * O Run terminou com sucesso.
       * Agora precisamos buscar o resultado
       * armazenado no Dataset do Apify.
       */
      if (!run.datasetId) {
        const failedDownload =
          await downloaderRepository.update(
            supabase,
            download.id,
            {
              status: "Erro",
              progress: 0,
            }
          );

        return NextResponse.json({
          data: failedDownload,
        });
      }

      try {
        const result =
          await externalDownloaderProvider.getYouTubeResult(
            run.datasetId,
            download.id
          );

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

        return NextResponse.json({
          data: completedDownload,
        });
      } catch (error) {
        console.error(
          "Erro ao processar resultado do YouTube:",
          error
        );

        const failedDownload =
          await downloaderRepository.update(
            supabase,
            download.id,
            {
              status: "Erro",
              progress: 0,
            }
          );

        return NextResponse.json({
          data: failedDownload,
        });
      }
    }

    return NextResponse.json({
      data: download,
    });
  } catch (error) {
    console.error(
      "Erro ao consultar download:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível consultar o download.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Não autenticado.",
        },
        { status: 401 }
      );
    }

    const { data, error } =
      await supabase
        .from("downloads")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id)
        .select("id")
        .maybeSingle();

    if (error) {
      throw new Error(
        `Não foi possível excluir o download: ${error.message}`
      );
    }

    if (!data) {
      return NextResponse.json(
        {
          error: "Download não encontrado.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: null,
    });
  } catch (error) {
    console.error(
      "Erro ao excluir download:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível excluir o download.",
      },
      { status: 500 }
    );
  }
}