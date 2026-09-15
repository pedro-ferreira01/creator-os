import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  workspaceService,
} from "../services/workspace.service";

import type {
  WorkspaceProject,
  WorkspaceStatus,
} from "../types";

export function useWorkspace() {
  const [projects, setProjects] = useState<
    WorkspaceProject[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadProjects = useCallback(
    async () => {
      try {
        setLoading(true);
        setError(null);

        const loadedProjects =
          await workspaceService.getProjects();

        setProjects(loadedProjects);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Não foi possível carregar os projetos.";

        console.error(
          "Erro ao carregar projetos:",
          error
        );

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  async function deleteProject(
    id: string
  ) {
    try {
      setError(null);

      await workspaceService.deleteProject(
        id
      );

      setProjects(
        (currentProjects) =>
          currentProjects.filter(
            (project) =>
              project.id !== id
          )
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o projeto.";

      console.error(
        "Erro ao excluir projeto:",
        error
      );

      setError(errorMessage);

      throw error;
    }
  }

  async function createProject(
    project: WorkspaceProject
  ) {
    try {
      setError(null);

      const createdProject =
        await workspaceService.createProject(
          project
        );

      setProjects(
        (currentProjects) => [
          createdProject,
          ...currentProjects,
        ]
      );

      return createdProject;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Não foi possível criar o projeto.";

      console.error(
        "Erro ao criar projeto:",
        error
      );

      setError(errorMessage);

      throw error;
    }
  }

  async function updateProject(
    updatedProject: WorkspaceProject
  ) {
    try {
      setError(null);

      const savedProject =
        await workspaceService.updateProject(
          updatedProject
        );

      setProjects(
        (currentProjects) =>
          currentProjects.map(
            (project) =>
              project.id ===
              savedProject.id
                ? savedProject
                : project
          )
      );

      return savedProject;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o projeto.";

      console.error(
        "Erro ao atualizar projeto:",
        error
      );

      setError(errorMessage);

      throw error;
    }
  }

  async function togglePin(
    id: string
  ) {
    const project =
      projects.find(
        (item) => item.id === id
      );

    if (!project) return;

    await updateProject({
      ...project,
      pinned: !project.pinned,
    });
  }

  async function toggleFavorite(
    id: string
  ) {
    const project =
      projects.find(
        (item) => item.id === id
      );

    if (!project) return;

    await updateProject({
      ...project,
      favorite: !project.favorite,
    });
  }

  async function toggleArchive(
    id: string
  ) {
    const project =
      projects.find(
        (item) => item.id === id
      );

    if (!project) return;

    await updateProject({
      ...project,
      archived: !project.archived,
    });
  }

  async function updateProjectStatus(
    id: string,
    status: WorkspaceStatus
  ) {
    const project =
      projects.find(
        (item) => item.id === id
      );

    if (!project) return;

    await updateProject({
      ...project,
      status,
    });
  }

  async function updateProjectProgress(
    id: string,
    progress: number
  ) {
    const project =
      projects.find(
        (item) => item.id === id
      );

    if (!project) return;

    const normalizedProgress =
      Math.min(
        100,
        Math.max(0, progress)
      );

    await updateProject({
      ...project,
      progress:
        normalizedProgress,
    });
  }

  return {
    projects,

    setProjects,

    loading,

    error,

    loadProjects,

    createProject,

    updateProject,

    deleteProject,

    togglePin,

    toggleFavorite,

    toggleArchive,

    updateProjectStatus,

    updateProjectProgress,
  };
}