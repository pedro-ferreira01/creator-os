import { useEffect, useRef } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

type WorkspaceFormProps = {
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
  focusProjectName?: boolean;
};

export default function WorkspaceForm({
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
  focusProjectName,
}: WorkspaceFormProps) {
  const nameInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!focusProjectName) return;

    nameInputRef.current?.focus();
  }, [focusProjectName]);

  if (!showCreateForm) return null;

  const isEditing =
    editingProjectId !== null;

  return (
    <div
      style={{
        marginTop: 20,
        padding: 16,
        border: "1px solid #334155",
        borderRadius: 12,
        background: "#1e293b",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <Input
        ref={nameInputRef}
        placeholder="Nome do projeto"
        value={
          isEditing
            ? editingName
            : projectName
        }
        onChange={(value) =>
          isEditing
            ? setEditingName(value)
            : setProjectName(value)
        }
      />

      <Textarea
        placeholder="Descrição do projeto"
        value={
          isEditing
            ? editingDescription
            : projectDescription
        }
        onChange={(value) =>
          isEditing
            ? setEditingDescription(value)
            : setProjectDescription(value)
        }
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <label
          htmlFor="workspace-due-date"
          style={{
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Prazo do projeto
        </label>

        <input
          id="workspace-due-date"
          type="date"
          value={
            isEditing
              ? editingDueDate
              : projectDueDate
          }
          onChange={(event) =>
            isEditing
              ? setEditingDueDate(
                  event.target.value
                )
              : setProjectDueDate(
                  event.target.value
                )
          }
        />
      </div>

      <Button
        onClick={handleCreateProject}
      >
        {isEditing
          ? "Salvar Alterações"
          : "Criar Projeto"}
      </Button>
    </div>
  );
}