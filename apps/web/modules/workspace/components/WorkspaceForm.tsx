import { useEffect, useRef } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

type WorkspaceFormProps = {
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
  focusProjectName?: boolean;
};

export default function WorkspaceForm({
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
focusProjectName,
}: WorkspaceFormProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (!focusProjectName) return;

  nameInputRef.current?.focus();
}, [focusProjectName]);
  if (!showCreateForm) return null;

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
  value={editingProjectId ? editingName : projectName}
  onChange={(value) =>
    editingProjectId
      ? setEditingName(value)
      : setProjectName(value)
  }
/>

    <Textarea
  placeholder="Descrição do projeto"
  value={
    editingProjectId
      ? editingDescription
      : projectDescription
  }
  onChange={(value) =>
    editingProjectId
      ? setEditingDescription(value)
      : setProjectDescription(value)
  }
/>

      <Button onClick={handleCreateProject}>
        {editingProjectId
          ? "Salvar Alterações"
          : "Criar Projeto"}
      </Button>
    </div>
  );
}