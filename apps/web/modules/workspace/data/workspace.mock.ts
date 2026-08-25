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

    pinned: false,
    favorite: true,
    archived: false,

    owner: "Sr. Finch",

    createdAt: "2026-08-01",

    dueDate: null,

    color: "#3b82f6",

    tags: [
      "Core",
      "MVP",
    ],
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

    pinned: false,
    favorite: false,
    archived: false,

    owner: "Sr. Finch",

    createdAt: "2026-08-02",

    dueDate: null,

    color: "#10b981",

    tags: [
      "Marketing",
    ],
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

    pinned: false,
    favorite: false,
    archived: false,

    owner: "Sr. Finch",

    createdAt: "2026-08-03",

    dueDate: null,

    color: "#f59e0b",

    tags: [
      "Educação",
    ],
  },
];