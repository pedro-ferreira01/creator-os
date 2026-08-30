import { downloadItems } from "../data/downloader.mock";

import type {
  CreateDownloadInput,
  DownloadItem,
} from "../types";

const STORAGE_KEY =
  "creatoros.downloads";

function loadDownloads(): DownloadItem[] {
  if (typeof window === "undefined") {
    return downloadItems;
  }

  const stored =
    localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return downloadItems;
  }

  try {
    return JSON.parse(
      stored
    ) as DownloadItem[];
  } catch {
    return downloadItems;
  }
}

function saveDownloads(
  downloads: DownloadItem[]
) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(downloads)
  );
}

export const downloaderService = {
  // ==========================
  // Listar downloads
  // ==========================

  getDownloads(): DownloadItem[] {
    return loadDownloads();
  },

  // ==========================
  // Salvar downloads
  // ==========================

  saveDownloads(
    downloads: DownloadItem[]
  ) {
    saveDownloads(downloads);
  },

  // ==========================
  // Buscar por ID
  // ==========================

  getDownloadById(
    id: string
  ): DownloadItem | undefined {
    return loadDownloads().find(
      (download) =>
        download.id === id
    );
  },

  // ==========================
  // Criar download
  // ==========================

  createDownload(
    input: CreateDownloadInput
  ): DownloadItem {
    return {
      id: crypto.randomUUID(),

      url: input.url,

      platform: input.platform,

      status: "Pendente",

      progress: 0,

      title: null,

      thumbnailUrl: null,

      fileName: null,

      fileUrl: null,

      errorMessage: null,

      createdAt: "Agora",

      updatedAt: null,
    };
  },

  // ==========================
  // Atualizar download
  // ==========================

  updateDownload(
  id: string,
  updates: Partial<DownloadItem>
): DownloadItem | undefined {
  const downloads =
    loadDownloads();

  const index =
    downloads.findIndex(
      (download) =>
        download.id === id
    );

  if (index === -1) {
    return undefined;
  }

  const currentDownload =
    downloads[index];

  if (!currentDownload) {
    return undefined;
  }

  const updatedDownload: DownloadItem = {
    ...currentDownload,
    ...updates,
    id,
  };

  downloads[index] =
    updatedDownload;

  saveDownloads(downloads);

  return updatedDownload;
},

  // ==========================
  // Excluir download
  // ==========================

  deleteDownload(
    id: string
  ): boolean {
    const downloads =
      loadDownloads();

    const filteredDownloads =
      downloads.filter(
        (download) =>
          download.id !== id
      );

    if (
      filteredDownloads.length ===
      downloads.length
    ) {
      return false;
    }

    saveDownloads(
      filteredDownloads
    );

    return true;
  },
};