import type {
  CreateDownloadInput,
  DownloadItem,
} from "../types";

const API_BASE_URL = "/api/downloads";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

async function request<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(
    input,
    {
      ...init,
      headers: {
        "Content-Type":
          "application/json",
        ...(init?.headers ?? {}),
      },
    }
  );

  const body =
    (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(
      body.error ??
        "Erro ao comunicar com o servidor."
    );
  }

  if (body.data === undefined) {
    throw new Error(
      "Resposta inválida do servidor."
    );
  }

  return body.data;
}

export const downloaderApi = {
  async createDownload(
    input: CreateDownloadInput
  ): Promise<DownloadItem> {
    return request<DownloadItem>(
      API_BASE_URL,
      {
        method: "POST",
        body: JSON.stringify(input),
      }
    );
  },

  async getDownload(
    id: string
  ): Promise<DownloadItem> {
    return request<DownloadItem>(
      `${API_BASE_URL}/${id}`
    );
  },

  async deleteDownload(
    id: string
  ): Promise<void> {
    await request<null>(
      `${API_BASE_URL}/${id}`,
      {
        method: "DELETE",
      }
    );
  },
};