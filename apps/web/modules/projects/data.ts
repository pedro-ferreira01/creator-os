import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "1",
    name: "CreatorOS",
    description: "Arquitetura principal do sistema",
    status: "active",
    priority: "high",
  },
  {
    id: "2",
    name: "Landing Page",
    description: "Página institucional",
    status: "planning",
    priority: "medium",
  },
  {
    id: "3",
    name: "Curso IA",
    description: "Estrutura das aulas",
    status: "completed",
    priority: "low",
  },
];