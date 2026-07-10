import Card from "@/components/ui/Card";
import type { Project } from "../types";

type ProjectCardProps = {
  project: Project;
};

const statusLabel: Record<Project["status"], string> = {
  planning: "Planejamento",
  active: "Em andamento",
  completed: "Concluído",
};

const priorityLabel: Record<Project["priority"], string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card title={project.name}>
      <p>{project.description}</p>

      <div style={{ marginTop: 12 }}>
        <strong>Status:</strong> {statusLabel[project.status]}
      </div>

      <div style={{ marginTop: 4 }}>
        <strong>Prioridade:</strong> {priorityLabel[project.priority]}
      </div>
    </Card>
  );
}