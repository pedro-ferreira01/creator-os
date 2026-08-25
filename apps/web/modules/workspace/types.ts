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

  pinned: boolean;

  favorite: boolean;

  archived: boolean;

  owner: string;

  createdAt: string;

  dueDate: string | null;

  color: string;

  tags: string[];
}