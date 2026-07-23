import { useMemo, useState } from "react";

import type { WorkspaceProject } from "@/modules/workspace";

type Props = {
  projects: WorkspaceProject[];
};

export function useWorkspaceController({
  projects,
}: Props) {
  // ==========================
  // UI
  // ==========================

  const [showCreateForm, setShowCreateForm] =
    useState(false);

  // ==========================
  // Filtros
  // ==========================

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("Todos");

  const [priorityFilter, setPriorityFilter] =
    useState("Todas");

  // ==========================
  // Formulário
  // ==========================

  const [projectName, setProjectName] =
    useState("");

  const [projectDescription, setProjectDescription] =
    useState("");

  const [editingProjectId, setEditingProjectId] =
    useState<string | null>(null);

  const [editingName, setEditingName] =
    useState("");

  const [editingDescription, setEditingDescription] =
    useState("");

  // ==========================
  // Projetos filtrados
  // ==========================

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "Todos" ||
        project.status === statusFilter;

      const matchesPriority =
        priorityFilter === "Todas" ||
        project.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    projects,
    search,
    statusFilter,
    priorityFilter,
  ]);

  return {
    // UI
    showCreateForm,
    setShowCreateForm,

    // Filtros
    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    priorityFilter,
    setPriorityFilter,

    // Formulário
    projectName,
    setProjectName,

    projectDescription,
    setProjectDescription,

    editingProjectId,
    setEditingProjectId,

    editingName,
    setEditingName,

    editingDescription,
    setEditingDescription,

    // Dados
    filteredProjects,
  };
}