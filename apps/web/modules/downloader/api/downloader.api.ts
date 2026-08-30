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
  const body =
    (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(
      body.error ??
        "Erro ao comunicar com a API."
    );
  }

  if (body.data === undefined) {
    throw new Error(
      "A API retornou uma resposta inválida."
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