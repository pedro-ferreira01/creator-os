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
  const downloading = downloads.filter(
    (item) => item.status === "Baixando"
  ).length;

  const completed = downloads.filter(
    (item) => item.status === "Concluído"
  ).length;

  const activeProjects = projects.filter(
    (project) => project.progress < 100
  ).length;

  const totalProgress =
  downloads.reduce(
    (total, download) => total + download.progress,
    0
  );

const averageProgress =
  downloads.length === 0
    ? 0
    : Math.round(totalProgress / downloads.length);

  return [
    {
      title: "Downloads",
      value: downloads.length,
     description: `${completed} concluídos • ${downloading} em andamento • ${averageProgress}% médio`,
    },
    {
      title: "Projetos",
      value: projects.length,
      description: `${activeProjects} ativos`,
    },
    {
      title: "IA",
      value: 0,
      description: "Em breve",
    },
    {
      title: "Receita",
      value: "R$ 0",
      description: "Em breve",
    },
  ];
}, [projects, downloads]);
}