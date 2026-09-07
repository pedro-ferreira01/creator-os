import {
  useEffect,
  useState,
} from "react";

import { downloaderApi } from "../api/downloader.api";

import type {
  CreateDownloadInput,
  DownloadItem,
} from "../types";

export function useDownloader() {
  const [downloads, setDownloads] =
    useState<DownloadItem[]>([]);

  const [loaded, setLoaded] =
    useState(false);

  // ==========================
  // Carregar histórico real
  // ==========================

  useEffect(() => {
    let cancelled = false;

    async function loadDownloads() {
      try {
        const storedDownloads =
          await downloaderApi.getDownloads();

        if (!cancelled) {
          setDownloads(
            storedDownloads
          );
        }
      } catch (error) {
        console.error(
          "Erro ao carregar downloads:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoaded(true);
        }
      }
    }

    loadDownloads();

    return () => {
      cancelled = true;
    };
  }, []);

  // ==========================
  // Atualizar download
  // ==========================

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

  // ==========================
  // Criar download
  // ==========================

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

  // ==========================
  // Remover da interface
  // ==========================

  async function deleteDownload(id: string) {
  try {
    await downloaderApi.deleteDownload(id);

    setDownloads((current) =>
      current.filter((download) => download.id !== id)
    );
  } catch (error) {
    console.error("Erro ao excluir download:", error);
  }
}

  // ==========================
  // Baixar arquivo
  // ==========================

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

  // ==========================
  // Ação principal
  // ==========================

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

      case "Processando": {
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
    loaded,
    createDownload,
    updateDownload,
    deleteDownload,
    handlePrimaryAction,
  };
}