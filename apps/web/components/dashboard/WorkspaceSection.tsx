import {
  forwardRef,
  useEffect,
  useRef,
} from "react";

import Card from "@/components/ui/Card";
import SearchInput from "@/components/ui/SearchInput";
import Select from "@/components/ui/Select";

import {
  WorkspaceToolbar,
  WorkspaceForm,
  WorkspaceList,
} from "@/modules/workspace";

import type {
  WorkspaceProject,
} from "@/modules/workspace";

type WorkspaceSectionProps = {
  search: string;
  setSearch: (value: string) => void;

  statusFilter: string;
  setStatusFilter: (value: string) => void;

  priorityFilter: string;
  setPriorityFilter: (value: string) => void;

  archiveFilter: string;
  setArchiveFilter: (value: string) => void;

  showCreateForm: boolean;

  editingProjectId: string | null;

 projectName: string;
projectDescription: string;
projectDueDate: string;

editingName: string;
editingDescription: string;
editingDueDate: string;

  setProjectName: (value: string) => void;
setProjectDescription: (value: string) => void;
setProjectDueDate: (value: string) => void;

setEditingName: (value: string) => void;
setEditingDescription: (value: string) => void;
setEditingDueDate: (value: string) => void;

  handleCreateProject: () => void;

  onToggleCreateForm: () => void;

  onCancelEdit: () => void;

  projects: WorkspaceProject[];

  onDelete: (id: string) => void;

  onEdit: (
    project: WorkspaceProject
  ) => void;

  onTogglePin: (
    project: WorkspaceProject
  ) => void;

  onToggleFavorite: (
    project: WorkspaceProject
  ) => void;

  onToggleArchive: (
    project: WorkspaceProject
  ) => void;

  onUpdateStatus: (
    id: string,
    status: WorkspaceProject["status"]
  ) => void;

  onUpdateProgress: (
    id: string,
    progress: number
  ) => void;

  focusSearch?: boolean;

  focusProjectName?: boolean;
};

const WorkspaceSection = forwardRef<
  HTMLElement,
  WorkspaceSectionProps
>(function WorkspaceSection(
  {
    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    priorityFilter,
    setPriorityFilter,

    archiveFilter,
    setArchiveFilter,

    showCreateForm,
    editingProjectId,

    projectName,
projectDescription,
projectDueDate,

editingName,
editingDescription,
editingDueDate,

    setProjectName,
setProjectDescription,
setProjectDueDate,

setEditingName,
setEditingDescription,
setEditingDueDate,

    handleCreateProject,

    onToggleCreateForm,
    onCancelEdit,

    projects,

    onDelete,
    onEdit,
    onTogglePin,
    onToggleFavorite,
    onToggleArchive,
    onUpdateStatus,
    onUpdateProgress,

    focusSearch,
    focusProjectName,
  }: WorkspaceSectionProps,
  ref
) {
  const searchInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!focusSearch) return;

    searchInputRef.current?.focus();
  }, [focusSearch]);

  return (
    <div id="workspace-section">
      <Card
        ref={ref}
        title="Workspace"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <SearchInput
            ref={searchInputRef}
            value={search}
            onChange={setSearch}
            placeholder="Pesquisar projetos..."
          />

          <div
            style={{
              display: "flex",
              gap: 12,
            }}
          >
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                "Todos",
                "Planejamento",
                "Em andamento",
                "Concluído",
              ]}
            />

            <Select
              value={priorityFilter}
              onChange={setPriorityFilter}
              options={[
                "Todas",
                "Alta",
                "Média",
                "Baixa",
              ]}
            />

            <Select
              value={archiveFilter}
              onChange={setArchiveFilter}
              options={[
                "Ativos",
                "Arquivados",
                "Todos",
              ]}
            />
          </div>
        </div>

        <WorkspaceToolbar
          showCreateForm={
            showCreateForm
          }
          editingProjectId={
            editingProjectId
          }
          onToggleCreateForm={
            onToggleCreateForm
          }
          onCancelEdit={
            onCancelEdit
          }
        />

        <WorkspaceForm
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
          focusProjectName={
            focusProjectName
          }
        />

        <WorkspaceList
          projects={projects}
          onDelete={onDelete}
          onEdit={onEdit}
          onTogglePin={onTogglePin}
          onToggleFavorite={
            onToggleFavorite
          }
          onToggleArchive={
            onToggleArchive
          }
          onUpdateStatus={
            onUpdateStatus
          }
          onUpdateProgress={
            onUpdateProgress
          }
        />
      </Card>
    </div>
  );
});

export default WorkspaceSection;