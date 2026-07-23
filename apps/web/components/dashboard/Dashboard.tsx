"use client";

import { useState } from "react";
import type { WorkspaceProject } from "@/modules/workspace";
import { useWorkspace } from "@/modules/workspace";
import {
  DashboardHeader,
  DashboardStats,
  RecentProjectsCard,
  DailyMissionCard,
  WorkspaceSection,
  DownloaderSection,
} from "@/components/dashboard";

import {
  useDownloader,
} from "@/modules/downloader";

import {
  recentProjects,
  dailyMission,
} from "@/lib/dashboard-data";

import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import CommandPalette from "@/components/ui/CommandPalette";
import { useCommandPalette } from "@/hooks/useCommandPalette";



export default function Dashboard() {
const {
  projects,
  createProject,
  updateProject,
  deleteProject,
} = useWorkspace();
const {
  downloads,
  createDownload,
  deleteDownload,
  handlePrimaryAction,
} = useDownloader();

const stats = useDashboardStats({
  projects,
  downloads,
});

const {
  message,
  visible,
  showToast,
} = useToast();

const {
  open,
  closePalette,
} = useCommandPalette();

function handleCommand(action: string) {
  closePalette();
  switch (action) {
    case "dashboard":
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      break;

    case "workspace":
  setFocusWorkspaceSearch(true);

  document
    .getElementById("workspace-section")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  break;

case "downloader":
  document
    .getElementById("downloader-section")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  break;

    case "new-project":
  setShowCreateForm(true);

  setFocusProjectName(true);

  document
    .getElementById("workspace-section")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  break;

    case "new-download":
      alert("Novo Download (será conectado na próxima Sprint)");
      break;

    default:
      console.log(action);
  }
}


const [showCreateForm, setShowCreateForm] = useState(false);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("Todos");
const [priorityFilter, setPriorityFilter] = useState("Todas");

const [projectName, setProjectName] = useState("");
const [projectDescription, setProjectDescription] = useState("");
const [editingProjectId, setEditingProjectId] = useState<string | null>(
  null
);
const [editingName, setEditingName] = useState("");
const [editingDescription, setEditingDescription] = useState("");
const [focusWorkspaceSearch, setFocusWorkspaceSearch] =
  useState(false);
  const [focusProjectName, setFocusProjectName] =
  useState(false);



function handleCreateProject() {
  const name = editingProjectId ? editingName : projectName;
  const description = editingProjectId
    ? editingDescription
    : projectDescription;

  if (!name.trim()) return;

  // MODO EDIÇÃO
  if (editingProjectId) {

    updateProject({
  ...projects.find((p) => p.id === editingProjectId)!,
  name,
  description: description || "Sem descrição",
  updatedAt: "Agora",
});

    handleCancelEdit();

    return;
  }

  // MODO CRIAÇÃO
  const newProject: WorkspaceProject = {
    id: crypto.randomUUID(),
    name,
    description: description || "Sem descrição",
    category: "Workspace",
    status: "Planejamento",
    priority: "Média",
    progress: 0,
    updatedAt: "Agora",
  };

  createProject(newProject);

  setProjectName("");
  setProjectDescription("");

  setShowCreateForm(false);
}
  

function handleStartEdit(project: WorkspaceProject) {
  setEditingProjectId(project.id);

  setEditingName(project.name);

  setEditingDescription(project.description);
  setShowCreateForm(true);
}

function handleCancelEdit() {
  setEditingProjectId(null);

  setEditingName("");

  setEditingDescription("");
  setShowCreateForm(false);
}



function handleDeleteProject(id: string) {
  deleteProject(id);
}



const filteredProjects = projects.filter((project) => {
  const matchesSearch = project.name
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
)
});
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

      <DashboardStats stats={stats} />

      <div className="dashboard-grid">
       <RecentProjectsCard
  projects={recentProjects}
/>

        <DailyMissionCard
  missions={dailyMission}
/>

          <WorkspaceSection
  showCreateForm={showCreateForm}
  editingProjectId={editingProjectId}
  projectName={projectName}
  projectDescription={projectDescription}
  editingName={editingName}
  editingDescription={editingDescription}
  setProjectName={setProjectName}
  setProjectDescription={setProjectDescription}
  setEditingName={setEditingName}
  setEditingDescription={setEditingDescription}
  handleCreateProject={handleCreateProject}
  onToggleCreateForm={() =>
    setShowCreateForm((current) => !current)
  }
  projects={filteredProjects}
  onDelete={handleDeleteProject}
  onEdit={handleStartEdit}

  search={search}
setSearch={setSearch}

statusFilter={statusFilter}
setStatusFilter={setStatusFilter}

priorityFilter={priorityFilter}
setPriorityFilter={setPriorityFilter}

focusSearch={focusWorkspaceSearch}
focusProjectName={focusProjectName}
/>

 <DownloaderSection
  downloads={downloads}
  onCreate={createDownload}
  onDelete={deleteDownload}
  onPrimaryAction={handlePrimaryAction}
/>

<CommandPalette
  open={open}
  onExecute={handleCommand}
/>
      </div>
    </>
  );
}
