import WorkspaceCard from "./WorkspaceCard";

import type { WorkspaceProject } from "../types";

type WorkspaceListProps = {
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
};

export default function WorkspaceList({
  projects,
  onDelete,
  onEdit,
  onTogglePin,
  onToggleFavorite,
  onToggleArchive,
}: WorkspaceListProps) {
  return (
    <div className="list">
      {projects.map((project) => (
        <WorkspaceCard
          key={project.id}
          project={project}
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
      ))}
    </div>
  );
}