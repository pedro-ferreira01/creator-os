import { downloadItems } from "../data/downloader.mock";
import type {
  CreateDownloadInput,
  DownloadItem,
} from "../types";

const STORAGE_KEY = "creatoros.downloads";

export const downloaderService = {
  getDownloads(): DownloadItem[] {
  if (typeof window === "undefined") {
    return downloadItems;
  }

  

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return downloadItems;
  }

  try {
    return JSON.parse(stored) as DownloadItem[];
  } catch {
    return downloadItems;
  }
},

saveDownloads(downloads: DownloadItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(downloads)
  );
},

  getDownloadById(id: string): DownloadItem | undefined {
    return downloadItems.find((item) => item.id === id);
  },

  createDownload(input: CreateDownloadInput): DownloadItem {
  return {
    id: crypto.randomUUID(),

    url: input.url,

    platform: input.platform,

    status: "Pendente",

    progress: 0,

    createdAt: "Agora",
  };
}
  }
