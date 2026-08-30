import type { DownloadItem } from "../types";

export const downloadItems: DownloadItem[] = [
  {
    id: "1",
    url: "https://youtube.com/watch?v=creatoros",
    platform: "YouTube",
    status: "Concluído",
    progress: 100,

    title: "CreatorOS — Vídeo de demonstração",
    thumbnailUrl: null,
    fileName: "creatoros-video.mp4",
    fileUrl: null,
    errorMessage: null,

    createdAt: "Hoje",
    updatedAt: "Hoje",
  },

  {
    id: "2",
    url: "https://tiktok.com/@creator/video/123",
    platform: "TikTok",
    status: "Baixando",
    progress: 62,

    title: "Vídeo TikTok",
    thumbnailUrl: null,
    fileName: null,
    fileUrl: null,
    errorMessage: null,

    createdAt: "Agora",
    updatedAt: "Agora",
  },

  {
    id: "3",
    url: "https://instagram.com/reel/abc123",
    platform: "Instagram",
    status: "Pendente",
    progress: 0,

    title: null,
    thumbnailUrl: null,
    fileName: null,
    fileUrl: null,
    errorMessage: null,

    createdAt: "Há 5 min",
    updatedAt: null,
  },
];