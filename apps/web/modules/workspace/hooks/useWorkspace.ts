import { useEffect, useState } from "react";

import { workspaceService } from "../services/workspace.service";

import type { WorkspaceProject } from "../types";

export function useWorkspace() {
  const [projects, setProjects] = useState<
    WorkspaceProject[]
  >([]);

  useEffect(() => {
    setProjects(
      workspaceService.getProjects()
    );
  }, []);

  function deleteProject(id: string) {
    const updatedProjects =
      projects.filter(
        (project) => project.id !== id
      );

    setProjects(updatedProjects);

    workspaceService.saveProjects(
      updatedProjects
    );
  }

  function createProject(
    project: WorkspaceProject
  ) {
    const updatedProjects = [
      project,
      ...projects,
    ];

    setProjects(updatedProjects);

    workspaceService.saveProjects(
      updatedProjects
    );
  }

  function updateProject(
    updatedProject: WorkspaceProject
  ) {
    const updatedProjects = projects.map(
      (project) =>
        project.id === updatedProject.id
          ? updatedProject
          : project
    );

    setProjects(updatedProjects);

    workspaceService.saveProjects(
      updatedProjects
    );
  }

  function togglePin(id: string) {
    const updatedProjects = projects.map(
      (project) =>
        project.id === id
          ? {
              ...project,
              pinned: !project.pinned,
            }
          : project
    );

    setProjects(updatedProjects);

    workspaceService.saveProjects(
      updatedProjects
    );
  }

  function toggleFavorite(
    id: string
  ) {
    const updatedProjects = projects.map(
      (project) =>
        project.id === id
          ? {
              ...project,
              favorite:
                !project.favorite,
            }
          : project
    );

    setProjects(updatedProjects);

    workspaceService.saveProjects(
      updatedProjects
    );
  }

  function toggleArchive(id: string) {
    const updatedProjects = projects.map(
      (project) =>
        project.id === id
          ? {
              ...project,
              archived:
                !project.archived,
            }
          : project
    );

    setProjects(updatedProjects);

    workspaceService.saveProjects(
      updatedProjects
    );
  }

  return {
    projects,

    setProjects,

    createProject,

    updateProject,

    deleteProject,

    togglePin,

    toggleFavorite,

    toggleArchive,
  };
}