import type { WorkspaceProject } from "../types";

export const workspaceProjects: WorkspaceProject[] = [
  {
    id: "1",
    name: "CreatorOS",
    description: "Arquitetura principal do sistema",
    category: "Sistema",
    status: "Em andamento",
    priority: "Alta",
    progress: 68,
    updatedAt: "Hoje",
  },
  {
    id: "2",
    name: "Landing Page",
    description: "Página institucional",
    category: "Marketing",
    status: "Planejamento",
    priority: "Média",
    progress: 15,
    updatedAt: "Ontem",
  },
  {
    id: "3",
    name: "Curso IA",
    description: "Área de membros",
    category: "Educação",
    status: "Planejamento",
    priority: "Baixa",
    progress: 8,
    updatedAt: "3 dias atrás",
  },
];