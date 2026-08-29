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

  const [
    showCreateForm,
    setShowCreateForm,
  ] = useState(false);

  // ==========================
  // Filtros
  // ==========================

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("Todos");

  const [
    priorityFilter,
    setPriorityFilter,
  ] = useState("Todas");

  const [
    archiveFilter,
    setArchiveFilter,
  ] = useState("Ativos");

  // ==========================
  // Formulário - criação
  // ==========================

  const [
    projectName,
    setProjectName,
  ] = useState("");

  const [
    projectDescription,
    setProjectDescription,
  ] = useState("");

  const [
    projectDueDate,
    setProjectDueDate,
  ] = useState("");

  // ==========================
  // Formulário - edição
  // ==========================

  const [
    editingProjectId,
    setEditingProjectId,
  ] = useState<string | null>(null);

  const [
    editingName,
    setEditingName,
  ] = useState("");

  const [
    editingDescription,
    setEditingDescription,
  ] = useState("");

  const [
    editingDueDate,
    setEditingDueDate,
  ] = useState("");

  // ==========================
  // Projetos filtrados
  // ==========================

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter(
      (project) => {
        const matchesSearch =
          project.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesStatus =
          statusFilter === "Todos" ||
          project.status === statusFilter;

        const matchesPriority =
          priorityFilter === "Todas" ||
          project.priority ===
            priorityFilter;

        const matchesArchive =
          archiveFilter === "Todos" ||
          (archiveFilter === "Ativos" &&
            !project.archived) ||
          (archiveFilter === "Arquivados" &&
            project.archived);

        return (
          matchesSearch &&
          matchesStatus &&
          matchesPriority &&
          matchesArchive
        );
      }
    );

    return [...filtered].sort(
      (a, b) => {
        if (a.pinned === b.pinned) {
          return 0;
        }

        return a.pinned ? -1 : 1;
      }
    );
  }, [
    projects,
    search,
    statusFilter,
    priorityFilter,
    archiveFilter,
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

    archiveFilter,
    setArchiveFilter,

    // Formulário - criação
    projectName,
    setProjectName,

    projectDescription,
    setProjectDescription,

    projectDueDate,
    setProjectDueDate,

    // Formulário - edição
    editingProjectId,
    setEditingProjectId,

    editingName,
    setEditingName,

    editingDescription,
    setEditingDescription,

    editingDueDate,
    setEditingDueDate,

    // Dados
    filteredProjects,
  };
}