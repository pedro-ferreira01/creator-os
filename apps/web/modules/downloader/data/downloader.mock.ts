import type { DownloadItem } from "../types";

export const downloadItems: DownloadItem[] = [
  {
    id: "1",
    url: "https://youtube.com/watch?v=creatoros",
    platform: "YouTube",
    status: "Concluído",
    progress: 100,
    createdAt: "Hoje",
  },
  {
    id: "2",
    url: "https://tiktok.com/@creator/video/123",
    platform: "TikTok",
    status: "Baixando",
    progress: 62,
    createdAt: "Agora",
  },
  {
    id: "3",
    url: "https://instagram.com/reel/abc123",
    platform: "Instagram",
    status: "Pendente",
    progress: 0,
    createdAt: "Há 5 min",
  },
];