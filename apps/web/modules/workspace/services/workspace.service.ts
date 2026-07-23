import { workspaceProjects } from "../data/workspace.mock";
import type { WorkspaceProject } from "../types";

const STORAGE_KEY = "creatoros.workspace";

function loadProjects(): WorkspaceProject[] {
  if (typeof window === "undefined") {
    return workspaceProjects;
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return workspaceProjects;
  }

  try {
    return JSON.parse(stored) as WorkspaceProject[];
  } catch {
    return workspaceProjects;
  }
}

function saveProjects(projects: WorkspaceProject[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(projects)
  );
}

export const workspaceService = {
  getProjects(): WorkspaceProject[] {
    return loadProjects();
  },

  saveProjects(projects: WorkspaceProject[]) {
    saveProjects(projects);
  },

  getProjectById(id: string): WorkspaceProject | undefined {
    return loadProjects().find(
      (project) => project.id === id
    );
  },
};