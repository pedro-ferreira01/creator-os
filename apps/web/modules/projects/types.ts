export type ProjectStatus =
  | "planning"
  | "active"
  | "completed";

export type ProjectPriority =
  | "low"
  | "medium"
  | "high";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
}