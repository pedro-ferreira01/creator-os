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
  recentProjects,
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

  editingProjectId,
  setEditingProjectId,

  editingName,
  setEditingName,

  editingDescription,
  setEditingDescription,

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

  function handleCreateProject() {
    const name = editingProjectId
      ? editingName
      : projectName;

    const description = editingProjectId
      ? editingDescription
      : projectDescription;

    if (!name.trim()) {
      return;
    }

    if (editingProjectId) {
      updateProject({
        ...projects.find(
          (project) =>
            project.id === editingProjectId
        )!,
        name,
        description:
          description || "Sem descrição",
        updatedAt: "Agora",
      });

      handleCancelEdit();

      return;
    }

    const newProject: WorkspaceProject = {
      id: crypto.randomUUID(),

      name,

      description:
        description || "Sem descrição",

      category: "Workspace",

      status: "Planejamento",

      priority: "Média",

      progress: 0,

      updatedAt: "Agora",

      pinned: false,

      favorite: false,

      archived: false,

      owner: "Sr. Finch",

      createdAt: new Date()
        .toISOString()
        .substring(0, 10),

      dueDate: null,

      color: "#3b82f6",

      tags: [],
    };

    createProject(newProject);

    setProjectName("");
    setProjectDescription("");

    setShowCreateForm(false);

    showToast(
      "Projeto criado com sucesso."
    );
  }

  function handleStartEdit(
    project: WorkspaceProject
  ) {
    setEditingProjectId(project.id);

    setEditingName(project.name);

    setEditingDescription(
      project.description
    );

    setShowCreateForm(true);
  }

  function handleCancelEdit() {
    setEditingProjectId(null);

    setEditingName("");

    setEditingDescription("");

    setShowCreateForm(false);
  }

  function handleDeleteProject(
    id: string
  ) {
    deleteProject(id);

    showToast("Projeto removido.");
  }

  function handleTogglePin(
    project: WorkspaceProject
  ) {
    togglePin(project.id);

    showToast(
      project.pinned
        ? "Projeto desafixado."
        : "Projeto fixado."
    );
  }

  function handleToggleFavorite(
    project: WorkspaceProject
  ) {
    toggleFavorite(project.id);

    showToast(
      project.favorite
        ? "Projeto removido dos favoritos."
        : "Projeto favoritado."
    );
  }


  function handleToggleArchive(
  project: WorkspaceProject
) {
  toggleArchive(project.id);

  showToast(
    project.archived
      ? "Projeto restaurado."
      : "Projeto arquivado."
  );
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
        <RecentProjectsCard
          projects={recentProjects}
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
          editingName={
            editingName
          }
          editingDescription={
            editingDescription
          }
          setProjectName={
            setProjectName
          }
          setProjectDescription={
            setProjectDescription
          }
          setEditingName={
            setEditingName
          }
          setEditingDescription={
            setEditingDescription
          }
          handleCreateProject={
            handleCreateProject
          }
          onToggleCreateForm={() =>
            setShowCreateForm(
              (current) => !current
            )
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
onCancelEdit={
  handleCancelEdit
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