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

  showCreateForm: boolean;

  editingProjectId: string | null;

  projectName: string;
  projectDescription: string;

  editingName: string;
  editingDescription: string;

  setProjectName: (value: string) => void;
  setProjectDescription: (value: string) => void;

  setEditingName: (value: string) => void;
  setEditingDescription: (value: string) => void;

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

    showCreateForm,
    editingProjectId,

    projectName,
    projectDescription,

    editingName,
    editingDescription,

    setProjectName,
    setProjectDescription,

    setEditingName,
    setEditingDescription,

    handleCreateProject,

    onToggleCreateForm,
    onCancelEdit,

    projects,

    onDelete,
    onEdit,
    onTogglePin,
    onToggleFavorite,
    onToggleArchive,

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
        />
      </Card>
    </div>
  );
});

export default WorkspaceSection;