import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import type { WorkspaceProject } from "../types";
import ProgressBar from "@/components/ui/ProgressBar";
import MetaText from "@/components/ui/MetaText";
import {
  getPriorityColor,
  getStatusColor,
} from "@/lib/workspace-colors";


type WorkspaceCardProps = {
  project: WorkspaceProject;
  onDelete: (id: string) => void;
  onEdit: (project: WorkspaceProject) => void;
};




export default function WorkspaceCard({
  project,
  onDelete,
  onEdit,
}: WorkspaceCardProps) {
  return (
    <div className="list-item">
      <strong>{project.name}</strong>

      <span>{project.description}</span>

      <MetaText>
  Categoria: {project.category}
</MetaText>

     <div
  style={{
    display: "flex",
    gap: 12,
    marginTop: 8,
    alignItems: "center",
  }}
>
  <Badge color={getStatusColor(project.status)}>
  {project.status}
</Badge>

<Badge color={getPriorityColor(project.priority)}>
  Prioridade {project.priority}
</Badge>
</div>

     <ProgressBar value={project.progress} />

     <MetaText>
  Progresso: {project.progress}% • Atualizado: {project.updatedAt}
</MetaText>

        <div
  style={{
    marginTop: 16,
  }}
>

  <Button onClick={() => onEdit(project)}>
  Editar
</Button>

  <Button
  onClick={() => {
    const confirmed = window.confirm(
      `Deseja realmente excluir o projeto "${project.name}"?`
    );

    if (confirmed) {
      onDelete(project.id);
    }
  }}
>
  Excluir
</Button>

</div>

    </div>
  );
}