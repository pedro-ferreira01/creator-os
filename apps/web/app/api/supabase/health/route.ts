import { NextResponse } from "next/server";

import {
  createSupabaseServerClient,
} from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase =
      await createSupabaseServerClient();

    const {
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json(
        {
          connected: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      connected: true,
      message:
        "Conexão com o Supabase estabelecida.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        connected: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro desconhecido.",
      },
      { status: 500 }
    );
  }
}