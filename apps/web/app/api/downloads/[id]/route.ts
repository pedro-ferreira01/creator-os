import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { downloaderRepository } from "@/modules/downloader/services/downloader.repository";

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

    const supabase = await createSupabaseServerClient();

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

    const download = await downloaderRepository.findById(
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

    return NextResponse.json({
      data: download,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Não foi possível consultar o download.",
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

    const supabase = await createSupabaseServerClient();

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

    const { data, error } = await supabase
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
        error: "Não foi possível excluir o download.",
      },
      { status: 500 }
    );
  }
}