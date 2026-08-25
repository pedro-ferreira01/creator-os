import { useMemo } from "react";

import type { WorkspaceProject } from "@/modules/workspace";
import type { DownloadItem } from "@/modules/downloader";

type Props = {
  projects: WorkspaceProject[];
  downloads: DownloadItem[];
};

export function useDashboardStats({
  projects,
  downloads,
}: Props) {
  return useMemo(() => {
    // ==========================
    // Downloads
    // ==========================

    const downloading = downloads.filter(
      (download) =>
        download.status === "Baixando"
    ).length;

    const completedDownloads =
      downloads.filter(
        (download) =>
          download.status === "Concluído"
      ).length;

    const totalDownloadProgress =
      downloads.reduce(
        (total, download) =>
          total + download.progress,
        0
      );

    const averageDownloadProgress =
      downloads.length === 0
        ? 0
        : Math.round(
            totalDownloadProgress /
              downloads.length
          );

    // ==========================
    // Workspace
    // ==========================

    const completedProjects =
      projects.filter(
        (project) =>
          project.status === "Concluído"
      ).length;

    const activeProjects =
      projects.filter(
        (project) =>
          project.status !== "Concluído"
      ).length;

    const pinnedProjects =
      projects.filter(
        (project) => project.pinned
      ).length;

    const totalProjectProgress =
      projects.reduce(
        (total, project) =>
          total + project.progress,
        0
      );

    const averageProjectProgress =
      projects.length === 0
        ? 0
        : Math.round(
            totalProjectProgress /
              projects.length
          );

    return [
      {
        title: "Downloads",

        value: downloads.length,

        description:
          `${completedDownloads} concluídos • ` +
          `${downloading} ativos • ` +
          `${averageDownloadProgress}% médio`,
      },

      {
        title: "Projetos",

        value: projects.length,

        description:
          `${activeProjects} ativos • ` +
          `${completedProjects} concluídos`,
      },

      {
        title: "Fixados",

        value: pinnedProjects,

        description:
          `${averageProjectProgress}% progresso médio`,
      },

      {
        title: "Receita",

        value: "R$ 0",

        description:
          "Módulo Financeiro (Sprint futura)",
      },
    ];
  }, [projects, downloads]);
}