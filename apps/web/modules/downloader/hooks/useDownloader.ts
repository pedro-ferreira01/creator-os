import {
  useEffect,
  useRef,
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

  const intervals = useRef<
    Record<
      string,
      ReturnType<typeof setInterval>
    >
  >({});

  // ==========================
  // Carregar downloads
  // ==========================

  useEffect(() => {
    const storedDownloads =
      downloaderService.getDownloads();

    setDownloads(storedDownloads);
    setLoaded(true);
  }, []);

  // ==========================
  // Persistir downloads
  // ==========================

  useEffect(() => {
    if (!loaded) return;

    downloaderService.saveDownloads(
      downloads
    );
  }, [downloads, loaded]);

  // ==========================
  // Limpar intervalos
  // ==========================

  useEffect(() => {
    return () => {
      Object.values(
        intervals.current
      ).forEach((interval) => {
        clearInterval(interval);
      });

      intervals.current = {};
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
  // Iniciar download
  // ==========================

  function startDownload(
    download: DownloadItem
  ) {
    if (intervals.current[download.id]) {
      return;
    }

    let progress = download.progress;

    updateDownload({
      ...download,
      status: "Baixando",
      updatedAt: new Date().toISOString(),
    });

    const interval = setInterval(() => {
      progress +=
        Math.floor(
          Math.random() * 15
        ) + 5;

      if (progress >= 100) {
        progress = 100;

        updateDownload({
          ...download,
          progress,
          status: "Concluído",
          updatedAt:
            new Date().toISOString(),
        });

        clearInterval(
          intervals.current[
            download.id
          ]
        );

        delete intervals.current[
          download.id
        ];

        return;
      }

      updateDownload({
        ...download,
        progress,
        status: "Baixando",
        updatedAt:
          new Date().toISOString(),
      });
    }, 1000);

    intervals.current[
      download.id
    ] = interval;
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

      startDownload(newDownload);
    } catch (error) {
      console.error(
        "Erro ao criar download:",
        error
      );
    }
  }

  // ==========================
  // Excluir download
  // ==========================

  function deleteDownload(
    id: string
  ) {
    const interval =
      intervals.current[id];

    if (interval) {
      clearInterval(interval);

      delete intervals.current[id];
    }

    setDownloads((current) =>
      current.filter(
        (download) =>
          download.id !== id
      )
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
      // --------------------------
      // Baixando → Cancelar
      // --------------------------

      case "Baixando": {
        const interval =
          intervals.current[id];

        if (interval) {
          clearInterval(interval);

          delete intervals.current[
            id
          ];
        }

        updateDownload({
          ...download,
          status: "Pendente",
          progress: 0,
          updatedAt:
            new Date().toISOString(),
        });

        break;
      }

      // --------------------------
      // Pendente → Iniciar
      // --------------------------

      case "Pendente": {
        startDownload(download);

        break;
      }

      // --------------------------
      // Concluído → Abrir
      // --------------------------

      case "Concluído": {
        console.log(
          "Abrir download:",
          id
        );

        break;
      }

      // --------------------------
      // Erro → Tentar novamente
      // --------------------------

      case "Erro": {
        const retryDownload = {
          ...download,
          status: "Pendente" as const,
          progress: 0,
          errorMessage: null,
          updatedAt:
            new Date().toISOString(),
        };

        updateDownload(
          retryDownload
        );

        startDownload(
          retryDownload
        );

        break;
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