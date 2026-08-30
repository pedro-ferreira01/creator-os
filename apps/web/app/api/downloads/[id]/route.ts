import { NextResponse } from "next/server";

import {
  downloaderService,
} from "@/modules/downloader";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const download =
      downloaderService.getDownloadById(id);

    if (!download) {
      return NextResponse.json(
        {
          error:
            "Download não encontrado.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: download,
    });
  } catch {
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

    const download =
      downloaderService.getDownloadById(id);

    if (!download) {
      return NextResponse.json(
        {
          error:
            "Download não encontrado.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: null,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Não foi possível excluir o download.",
      },
      { status: 500 }
    );
  }
}