"use client";

import { useState } from "react";

import {
  DashboardHeader,
  DashboardStats,
  RecentProjectsCard,
  DailyMissionCard,
  WorkspaceSection,
  DownloaderSection,
} from "@/components/dashboard";

import CommandPalette from "@/components/ui/CommandPalette";
import Toast from "@/components/ui/Toast";

import {
  useWorkspace,
  type WorkspaceProject,
} from "@/modules/workspace";

import { useDownloader } from "@/modules/downloader";

import {
  
  dailyMission,
} from "@/lib/dashboard-data";

import { useToast } from "@/hooks/useToast";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { useWorkspaceController } from "@/hooks/useWorkspaceController";
import { useCommandActions } from "@/hooks/useCommandActions";

export default function Dashboard() {
  // ==========================
  // Workspace
  // ==========================

  const {
    projects,
    createProject,
    updateProject,
    deleteProject,
    togglePin,
    toggleFavorite,
    toggleArchive,
    updateProjectStatus,
    updateProjectProgress,
  } = useWorkspace();

  const {
    showCreateForm,
    setShowCreateForm,

    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    priorityFilter,
    setPriorityFilter,

    archiveFilter,
    setArchiveFilter,

    projectName,
    setProjectName,

    projectDescription,
    setProjectDescription,

    projectDueDate,
    setProjectDueDate,

    editingProjectId,
    setEditingProjectId,

    editingName,
    setEditingName,

    editingDescription,
    setEditingDescription,

    editingDueDate,
    setEditingDueDate,

    filteredProjects,
  } = useWorkspaceController({
    projects,
  });

  // ==========================
  // Downloader
  // ==========================

  const {
    downloads,
    createDownload,
    deleteDownload,
    handlePrimaryAction,
  } = useDownloader();

  // ==========================
  // Dashboard Stats
  // ==========================

  const stats = useDashboardStats({
    projects,
    downloads,
  });

  // ==========================
  // Toast
  // ==========================

  const {
    message,
    visible,
    showToast,
  } = useToast();

  // ==========================
  // Command Palette
  // ==========================

  const {
    open,
    closePalette,
  } = useCommandPalette();

  // ==========================
  // UI State
  // ==========================

  const [
    focusWorkspaceSearch,
    setFocusWorkspaceSearch,
  ] = useState(false);

  const [
    focusProjectName,
    setFocusProjectName,
  ] = useState(false);

  const {
    executeCommand,
  } = useCommandActions({
    closePalette,
    setShowCreateForm,
    setFocusWorkspaceSearch,
    setFocusProjectName,
  });

  // ==========================
  // Workspace Actions
  // ==========================

  async function handleCreateProject() {
    const name = editingProjectId
      ? editingName
      : projectName;

    const description = editingProjectId
      ? editingDescription
      : projectDescription;

    const dueDate = editingProjectId
      ? editingDueDate
      : projectDueDate;

    if (!name.trim()) {
      return;
    }

    try {
      if (editingProjectId) {
        const existingProject =
          projects.find(
            (project) =>
              project.id === editingProjectId
          );

        if (!existingProject) {
          return;
        }

        await updateProject({
          ...existingProject,
          name: name.trim(),
          description:
            description.trim() ||
            "Sem descrição",
          dueDate: dueDate || null,
        });

        handleCancelEdit();

        showToast(
          "Projeto atualizado com sucesso."
        );

        return;
      }

      const newProject: WorkspaceProject = {
        id: crypto.randomUUID(),

        name: name.trim(),

        description:
          description.trim() ||
          "Sem descrição",

        category: "Workspace",

        status: "Planejamento",

        priority: "Média",

        progress: 0,

        updatedAt: new Date().toISOString(),

        pinned: false,

        favorite: false,

        archived: false,

        owner: "Sr. Finch",

        createdAt: new Date()
          .toISOString()
          .substring(0, 10),

        dueDate: dueDate || null,

        color: "#3b82f6",

        tags: [],
      };

      await createProject(newProject);

      setProjectName("");
      setProjectDescription("");
      setProjectDueDate("");

      setShowCreateForm(false);

      showToast(
        "Projeto criado com sucesso."
      );
    } catch (error) {
      console.error(
        "Erro na operação do projeto:",
        error
      );

      showToast(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o projeto."
      );
    }
  }

  function handleStartEdit(
    project: WorkspaceProject
  ) {
    setEditingProjectId(project.id);

    setEditingName(project.name);

    setEditingDescription(
      project.description
    );

    setEditingDueDate(
      project.dueDate || ""
    );

    setShowCreateForm(true);
  }

  function handleCancelEdit() {
    setEditingProjectId(null);

    setEditingName("");

    setEditingDescription("");

    setEditingDueDate("");

    setShowCreateForm(false);
  }

  async function handleDeleteProject(
    id: string
  ) {
    try {
      await deleteProject(id);

      showToast("Projeto removido.");
    } catch (error) {
      console.error(
        "Erro ao remover projeto:",
        error
      );

      showToast(
        error instanceof Error
          ? error.message
          : "Não foi possível remover o projeto."
      );
    }
  }

  async function handleTogglePin(
    project: WorkspaceProject
  ) {
    try {
      await togglePin(project.id);

      showToast(
        project.pinned
          ? "Projeto desafixado."
          : "Projeto fixado."
      );
    } catch (error) {
      console.error(
        "Erro ao alterar fixação:",
        error
      );

      showToast(
        error instanceof Error
          ? error.message
          : "Não foi possível alterar a fixação."
      );
    }
  }

  async function handleToggleFavorite(
    project: WorkspaceProject
  ) {
    try {
      await toggleFavorite(project.id);

      showToast(
        project.favorite
          ? "Projeto removido dos favoritos."
          : "Projeto favoritado."
      );
    } catch (error) {
      console.error(
        "Erro ao alterar favorito:",
        error
      );

      showToast(
        error instanceof Error
          ? error.message
          : "Não foi possível alterar o favorito."
      );
    }
  }

  async function handleToggleArchive(
    project: WorkspaceProject
  ) {
    try {
      await toggleArchive(project.id);

      showToast(
        project.archived
          ? "Projeto restaurado."
          : "Projeto arquivado."
      );
    } catch (error) {
      console.error(
        "Erro ao alterar arquivamento:",
        error
      );

      showToast(
        error instanceof Error
          ? error.message
          : "Não foi possível alterar o arquivamento."
      );
    }
  }

  async function handleUpdateStatus(
    id: string,
    status: WorkspaceProject["status"]
  ) {
    try {
      await updateProjectStatus(
        id,
        status
      );

      showToast(
        "Status do projeto atualizado."
      );
    } catch (error) {
      console.error(
        "Erro ao atualizar status:",
        error
      );

      showToast(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o status."
      );
    }
  }

  async function handleUpdateProgress(
    id: string,
    progress: number
  ) {
    try {
      await updateProjectProgress(
        id,
        progress
      );

      showToast(
        "Progresso do projeto atualizado."
      );
    } catch (error) {
      console.error(
        "Erro ao atualizar progresso:",
        error
      );

      showToast(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o progresso."
      );
    }
  }

  // ==========================
  // Render
  // ==========================

  return (
    <>
      <Toast
        message={message}
        visible={visible}
      />

      <DashboardHeader
        title="Command Center"
        subtitle="Bem-vindo ao CreatorOS, Sr. Finch. Seu ambiente de trabalho está pronto."
      />

      <DashboardStats
        stats={stats}
      />

      <div className="dashboard-grid">
        <RecentProjectsCard projects={projects} 
        />
    

        <DailyMissionCard
          missions={dailyMission}
        />

        <WorkspaceSection
          showCreateForm={
            showCreateForm
          }

          editingProjectId={
            editingProjectId
          }

          projectName={
            projectName
          }

          projectDescription={
            projectDescription
          }

          projectDueDate={
            projectDueDate
          }

          editingName={
            editingName
          }

          editingDescription={
            editingDescription
          }

          editingDueDate={
            editingDueDate
          }

          setProjectName={
            setProjectName
          }

          setProjectDescription={
            setProjectDescription
          }

          setProjectDueDate={
            setProjectDueDate
          }

          setEditingName={
            setEditingName
          }

          setEditingDescription={
            setEditingDescription
          }

          setEditingDueDate={
            setEditingDueDate
          }

          handleCreateProject={
            handleCreateProject
          }

          onToggleCreateForm={() =>
            setShowCreateForm(
              (current) => !current
            )
          }

          onCancelEdit={
            handleCancelEdit
          }

          projects={
            filteredProjects
          }

          onDelete={
            handleDeleteProject
          }

          onEdit={
            handleStartEdit
          }

          onTogglePin={
            handleTogglePin
          }

          onToggleFavorite={
            handleToggleFavorite
          }

          onToggleArchive={
            handleToggleArchive
          }

          onUpdateStatus={
            handleUpdateStatus
          }

          onUpdateProgress={
            handleUpdateProgress
          }

          search={search}
          setSearch={setSearch}

          statusFilter={
            statusFilter
          }

          setStatusFilter={
            setStatusFilter
          }

          priorityFilter={
            priorityFilter
          }

          setPriorityFilter={
            setPriorityFilter
          }

          archiveFilter={
            archiveFilter
          }

          setArchiveFilter={
            setArchiveFilter
          }

          focusSearch={
            focusWorkspaceSearch
          }

          focusProjectName={
            focusProjectName
          }
        />

        <DownloaderSection
          downloads={downloads}
          onCreate={
            createDownload
          }
          onDelete={
            deleteDownload
          }
          onPrimaryAction={
            handlePrimaryAction
          }
        />

        <CommandPalette
          open={open}
          onExecute={
            executeCommand
          }
        />
      </div>
    </>
  );
}