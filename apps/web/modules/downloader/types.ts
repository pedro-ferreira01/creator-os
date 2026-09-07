export type DownloadPlatform =
  | "YouTube"
  | "TikTok"
  | "Instagram"
  | "Facebook";

export type DownloadStatus =
  | "Pendente"
  | "Baixando"
  | "Processando"
  | "Concluído"
  | "Erro";

export interface DownloadItem {
  id: string;

  userId: string;

  url: string;

  platform: DownloadPlatform;

  status: DownloadStatus;

  progress: number;

  title: string | null;

  thumbnailUrl: string | null;

  fileName: string | null;

  fileUrl: string | null;

  errorMessage: string | null;

  createdAt: string;

  updatedAt: string | null;
}

export interface CreateDownloadInput {
  url: string;

  platform: DownloadPlatform;
}