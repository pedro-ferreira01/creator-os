import {
  useEffect,
  useState,
} from "react";

import { downloaderApi } from "../api/downloader.api";
import { downloaderService } from "../services/downloader.service";

import type {
  CreateDownloadInput,
  DownloadItem,
} from "../types";

export function useDownloader() {
  const [downloads, setDownloads] =
    useState<DownloadItem[]>([]);

  const [loaded, setLoaded] =
    useState(false);

  useEffect(() => {
    const storedDownloads =
      downloaderService.getDownloads();

    setDownloads(storedDownloads);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    downloaderService.saveDownloads(
      downloads
    );
  }, [downloads, loaded]);

  function updateDownload(
    updated: DownloadItem
  ) {
    setDownloads((current) =>
      current.map((download) =>
        download.id === updated.id
          ? updated
          : download
      )
    );
  }

  async function createDownload(
    input: CreateDownloadInput
  ) {
    try {
      const newDownload =
        await downloaderApi.createDownload(
          input
        );

      setDownloads((current) => [
        newDownload,
        ...current,
      ]);
    } catch (error) {
      console.error(
        "Erro ao criar download:",
        error
      );
    }
  }

  function deleteDownload(
    id: string
  ) {
    setDownloads((current) =>
      current.filter(
        (download) =>
          download.id !== id
      )
    );
  }

  function downloadFile(
    download: DownloadItem
  ) {
    if (!download.fileUrl) {
      console.error(
        "Download concluído sem URL de arquivo:",
        download.id
      );

      return;
    }

    const params =
      new URLSearchParams({
        url: download.fileUrl,
        filename:
          download.fileName ??
          `creatoros-${download.id}.mp4`,
      });

    window.open(
      `/api/downloads/file?${params.toString()}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function handlePrimaryAction(
    id: string
  ) {
    const download =
      downloads.find(
        (item) =>
          item.id === id
      );

    if (!download) return;

    switch (download.status) {
      case "Baixando": {
        return;
      }

      case "Pendente": {
        console.warn(
          "Processamento de downloads pendentes ainda não está disponível.",
          id
        );

        return;
      }

      case "Concluído": {
        downloadFile(download);
        break;
      }

      case "Erro": {
        console.warn(
          "Retry de downloads com erro ainda será implementado.",
          id
        );

        return;
      }
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