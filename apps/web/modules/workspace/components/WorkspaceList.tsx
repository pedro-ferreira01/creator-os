import WorkspaceCard from "./WorkspaceCard";

import type { WorkspaceProject } from "../types";

type WorkspaceListProps = {
  projects: WorkspaceProject[];
  onDelete: (id: string) => void;
  onEdit: (project: WorkspaceProject) => void;
};

export default function WorkspaceList({
  projects,
  onDelete,
  onEdit,
}: WorkspaceListProps) {
  return (
    <div className="list">
      {projects.map((project) => (
  <WorkspaceCard
  key={project.id}
  project={project}
  onDelete={onDelete}
  onEdit={onEdit}
/>   ))}
    </div>
  );
}