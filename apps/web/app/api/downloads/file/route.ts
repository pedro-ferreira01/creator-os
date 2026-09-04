import { NextResponse } from "next/server";

function getFileName(
  value: string | null
): string {
  if (!value) {
    return "creatoros-download.mp4";
  }

  const sanitized =
    value
      .trim()
      .replace(
        /[^a-zA-Z0-9._-]/g,
        "-"
      );

  return (
    sanitized ||
    "creatoros-download.mp4"
  );
}

export async function GET(
  request: Request
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const fileUrl =
      searchParams.get("url");

    const fileName =
      searchParams.get("filename");

    if (!fileUrl) {
      return NextResponse.json(
        {
          error:
            "A URL do arquivo é obrigatória.",
        },
        { status: 400 }
      );
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(fileUrl);
    } catch {
      return NextResponse.json(
        {
          error:
            "A URL do arquivo é inválida.",
        },
        { status: 400 }
      );
    }

    const allowedHosts = [
      "fbcdn.net",
      "facebook.com",
      "fb.com",
      "fbsbx.com",
    ];

    const hostname =
      parsedUrl.hostname
        .toLowerCase()
        .replace(/^www\./, "");

    const isAllowedHost =
      allowedHosts.some(
        (allowedHost) =>
          hostname === allowedHost ||
          hostname.endsWith(
            `.${allowedHost}`
          )
      );

    if (!isAllowedHost) {
      return NextResponse.json(
        {
          error:
            "O domínio do arquivo não é permitido.",
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      parsedUrl.toString(),
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            `Não foi possível obter o arquivo. Status: ${response.status}.`,
        },
        {
          status: 502,
        }
      );
    }

    if (!response.body) {
      return NextResponse.json(
        {
          error:
            "O servidor de origem não retornou um arquivo.",
        },
        { status: 502 }
      );
    }

    const contentType =
      response.headers.get(
        "content-type"
      ) ??
      "video/mp4";

    const contentLength =
      response.headers.get(
        "content-length"
      );

    const headers =
      new Headers();

    headers.set(
      "Content-Type",
      contentType
    );

    headers.set(
      "Content-Disposition",
      `attachment; filename="${getFileName(
        fileName
      )}"`
    );

    headers.set(
      "Cache-Control",
      "no-store"
    );

    if (contentLength) {
      headers.set(
        "Content-Length",
        contentLength
      );
    }

    return new Response(
      response.body,
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.error(
      "Erro ao baixar arquivo:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível baixar o arquivo.",
      },
      { status: 500 }
    );
  }
}