import { useState } from "react";

import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import MetaText from "@/components/ui/MetaText";
import Select from "@/components/ui/Select";

import type {
  WorkspaceProject,
  WorkspaceStatus,
} from "../types";

import {
  getPriorityColor,
  getStatusColor,
} from "@/lib/workspace-colors";

import {
  getWorkspaceDeadlineState,
  getWorkspaceDeadlineLabel,
} from "@/lib/workspace-deadline";

type WorkspaceCardProps = {
  project: WorkspaceProject;

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
    status: WorkspaceStatus
  ) => void;

  onUpdateProgress: (
    id: string,
    progress: number
  ) => void;
};

export default function WorkspaceCard({
  project,
  onDelete,
  onEdit,
  onTogglePin,
  onToggleFavorite,
  onToggleArchive,
  onUpdateStatus,
  onUpdateProgress,
}: WorkspaceCardProps) {
  /*
   * Compatibilidade com projetos antigos salvos
   * no localStorage antes da existência de tags.
   */
  const tags = Array.isArray(project.tags)
    ? project.tags
    : [];

  const [progressInput, setProgressInput] =
    useState(String(project.progress ?? 0));

  function handleProgressChange(
    value: string
  ) {
    setProgressInput(value);
  }

  function handleProgressCommit() {
    const numericValue = Number(
      progressInput
    );

    if (Number.isNaN(numericValue)) {
      setProgressInput(
        String(project.progress ?? 0)
      );

      return;
    }

    const normalizedProgress = Math.min(
      100,
      Math.max(0, numericValue)
    );

    setProgressInput(
      String(normalizedProgress)
    );

    if (
      normalizedProgress !==
      project.progress
    ) {
      onUpdateProgress(
        project.id,
        normalizedProgress
      );
    }
  }

  const deadlineState =
    getWorkspaceDeadlineState(
      project.dueDate ?? null
    );

  const deadlineLabel =
    getWorkspaceDeadlineLabel(
      project.dueDate ?? null
    );

  const formattedDueDate =
    project.dueDate
      ? new Date(
          `${project.dueDate}T00:00:00`
        ).toLocaleDateString("pt-BR")
      : null;

  const formattedCreatedAt =
    project.createdAt
      ? new Date(
          `${project.createdAt}T00:00:00`
        ).toLocaleDateString("pt-BR")
      : "Data não disponível";

  function getDeadlineColor() {
    switch (deadlineState) {
      case "atrasado":
        return "#ef4444";

      case "proximo":
        return "#f59e0b";

      case "em-dia":
        return "#22c55e";

      default:
        return "#94a3b8";
    }
  }

  return (
    <div
      className="list-item"
      style={{
        border: project.pinned
          ? "1px solid #eab308"
          : undefined,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <strong>
          {project.pinned ? "📌 " : ""}
          {project.favorite ? "⭐ " : ""}
          {project.name}
        </strong>

        <div
          style={{
            display: "flex",
            gap: 8,
          }}
        >
          <Button
            onClick={() =>
              onToggleFavorite(project)
            }
          >
            {project.favorite
              ? "Favorito"
              : "Favoritar"}
          </Button>

          <Button
            onClick={() =>
              onTogglePin(project)
            }
          >
            {project.pinned
              ? "Desafixar"
              : "Fixar"}
          </Button>
        </div>
      </div>

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
          flexWrap: "wrap",
        }}
      >
        <Badge
          color={getStatusColor(project.status)}
        >
          {project.status}
        </Badge>

        <Badge
          color={getPriorityColor(project.priority)}
        >
          Prioridade {project.priority}
        </Badge>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginTop: 12,
        }}
      >
        <MetaText>
          Responsável: {project.owner}
        </MetaText>

        <MetaText>
          Criado em: {formattedCreatedAt}
        </MetaText>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <MetaText>
            Prazo:{" "}
            {formattedDueDate
              ? formattedDueDate
              : "Sem prazo"}
          </MetaText>

          <Badge
            color={getDeadlineColor()}
          >
            {deadlineLabel}
          </Badge>
        </div>
      </div>

      {tags.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {tags.map((tag) => (
            <Badge
              key={`${project.id}-${tag}`}
              color={project.color ?? "#3b82f6"}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 12,
          alignItems: "center",
        }}
      >
        <Select
          value={project.status}
          onChange={(value) =>
            onUpdateStatus(
              project.id,
              value as WorkspaceStatus
            )
          }
          options={[
            "Planejamento",
            "Em andamento",
            "Concluído",
          ]}
        />

        <input
          type="number"
          min={0}
          max={100}
          value={progressInput}
          onChange={(event) =>
            handleProgressChange(
              event.target.value
            )
          }
          onBlur={handleProgressCommit}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.currentTarget.blur();
            }
          }}
          style={{
            width: 80,
          }}
          aria-label="Progresso do projeto"
        />

        <span>%</span>
      </div>

      <ProgressBar
        value={project.progress ?? 0}
      />

      <MetaText>
        Progresso: {project.progress ?? 0}% •
        Atualizado: {project.updatedAt}
      </MetaText>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          gap: 8,
        }}
      >
        <Button
          onClick={() => onEdit(project)}
        >
          Editar
        </Button>

        <Button
          onClick={() =>
            onToggleArchive(project)
          }
        >
          {project.archived
            ? "Restaurar"
            : "Arquivar"}
        </Button>

        <Button
          onClick={() => {
            const confirmed =
              window.confirm(
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