import type {
  DashboardStat,
  RecentProject,
  DailyMission,
} from "@/types/dashboard";

export const dashboardStats: DashboardStat[] = [
  {
    title: "Downloads",
    value: "0",
  },
  {
    title: "Projetos",
    value: "0",
  },
  {
    title: "IA",
    value: "0",
  },
  {
    title: "Receita",
    value: "R$ 0",
  },
];

export const recentProjects: RecentProject[] = [
  {
    title: "CreatorOS",
    description: "Arquitetura do sistema",
  },
  {
    title: "Landing Page",
    description: "Em desenvolvimento",
  },
  {
    title: "Curso IA",
    description: "Planejamento",
  },
];

export const dailyMission: DailyMission[] = [
  "Finalizar Dashboard",
  "Revisar Componentes",
  "Commit da Sprint",
];