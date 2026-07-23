export type DownloadPlatform =
  | "YouTube"
  | "TikTok"
  | "Instagram"
  | "Facebook";

export type DownloadStatus =
  | "Pendente"
  | "Baixando"
  | "Concluído"
  | "Erro";

export interface DownloadItem {
  id: string;

  url: string;

  platform: DownloadPlatform;

  status: DownloadStatus;

  progress: number;

  createdAt: string;
}

export interface CreateDownloadInput {
  url: string;

  platform: DownloadPlatform;
}