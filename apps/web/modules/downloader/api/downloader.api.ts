import type {
  CreateDownloadInput,
  DownloadItem,
} from "../types";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

async function parseResponse<T>(
  response: Response
): Promise<T> {
  const text = await response.text();

  let body: ApiResponse<T> = {};

  if (text.trim()) {
    try {
      body = JSON.parse(
        text
      ) as ApiResponse<T>;
    } catch {
      throw new Error(
        `A API retornou uma resposta inválida (HTTP ${response.status}).`
      );
    }
  }

  if (!response.ok) {
    const message =
      typeof body.error === "string" &&
      body.error.trim()
        ? body.error
        : `Erro ao comunicar com a API (HTTP ${response.status}).`;

    throw new Error(message);
  }

  if (
    !Object.prototype.hasOwnProperty.call(
      body,
      "data"
    ) ||
    body.data === undefined
  ) {
    throw new Error(
      "A API retornou uma resposta sem dados."
    );
  }

  return body.data;
}

export const downloaderApi = {
  async createDownload(
    input: CreateDownloadInput
  ): Promise<DownloadItem> {
    const response = await fetch(
      "/api/downloads",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    return parseResponse<DownloadItem>(
      response
    );
  },

  async getDownload(
    id: string
  ): Promise<DownloadItem> {
    const response = await fetch(
      `/api/downloads/${id}`,
      {
        method: "GET",
      }
    );

    return parseResponse<DownloadItem>(
      response
    );
  },

  async deleteDownload(
    id: string
  ): Promise<void> {
    const response = await fetch(
      `/api/downloads/${id}`,
      {
        method: "DELETE",
      }
    );

    await parseResponse<null>(response);
  },
};