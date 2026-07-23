export type WorkspaceStatus =
  | "Planejamento"
  | "Em andamento"
  | "Concluído";

export type WorkspacePriority =
  | "Alta"
  | "Média"
  | "Baixa";

export interface WorkspaceProject {
  id: string;

  name: string;

  description: string;

  category: string;

  status: WorkspaceStatus;

  priority: WorkspacePriority;

  progress: number;

  updatedAt: string;
}