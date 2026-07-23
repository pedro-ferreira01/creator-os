import { useEffect, useRef, useState } from "react";

import { downloaderService } from "../services/downloader.service";

import type {
  CreateDownloadInput,
  DownloadItem,
} from "../types";

export function useDownloader() {
 const [downloads, setDownloads] = useState<DownloadItem[]>([]);

  const intervals = useRef<
    Record<string, ReturnType<typeof setInterval>>
  >({});

  const [loaded, setLoaded] = useState(false);

useEffect(() => {
  if (!loaded) return;

  downloaderService.saveDownloads(downloads);
}, [downloads, loaded]);

useEffect(() => {
  const storedDownloads = downloaderService.getDownloads();

  setDownloads(storedDownloads);

  setLoaded(true);
}, []);


  function updateDownload(updated: DownloadItem) {
    setDownloads((current) =>
      current.map((download) =>
        download.id === updated.id
          ? updated
          : download
      )
    );
  }

  function createDownload(input: CreateDownloadInput) {
    const newDownload =
      downloaderService.createDownload(input);

    setDownloads((current) => [
      newDownload,
      ...current,
    ]);

    startDownload(newDownload);
  }

function startDownload(download: DownloadItem) {
  let progress = download.progress;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;

    if (progress >= 100) {
      progress = 100;

      updateDownload({
        ...download,
        progress,
        status: "Concluído",
      });

      clearInterval(intervals.current[download.id]);
      delete intervals.current[download.id];

      return;
    }

    updateDownload({
      ...download,
      progress,
      status: "Baixando",
    });
  }, 1000);

  intervals.current[download.id] = interval;
}


  function deleteDownload(id: string) {
    if (intervals.current[id]) {
      clearInterval(intervals.current[id]);
      delete intervals.current[id];
    }

    setDownloads((current) =>
      current.filter(
        (download) => download.id !== id
      )
    );
  }

  function handlePrimaryAction(id: string) {
  const download = downloads.find(
    (item) => item.id === id
  );

  if (!download) return;

  switch (download.status) {
    case "Baixando":
      if (intervals.current[id]) {
        clearInterval(intervals.current[id]);
        delete intervals.current[id];
      }

      updateDownload({
        ...download,
        status: "Pendente",
        progress: 0,
      });

      break;

    case "Concluído":
      console.log("Abrir download:", id);
      break;

    case "Erro":
      console.log("Tentar novamente:", id);
      break;

    case "Pendente":
  startDownload(download);

  updateDownload({
    ...download,
    status: "Baixando",
  });

  break;
  }
}


 return {
  downloads,
  createDownload,
  updateDownload,
  deleteDownload,
  handlePrimaryAction,
};
}
 
