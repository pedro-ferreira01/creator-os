import { useState } from "react";

export function useWorkspaceForm() {
  const [projectName, setProjectName] =
    useState("");

  const [projectDescription, setProjectDescription] =
    useState("");

  const [editingProjectId, setEditingProjectId] =
    useState<string | null>(null);

  const [editingName, setEditingName] =
    useState("");

  const [editingDescription, setEditingDescription] =
    useState("");

  return {
    projectName,
    setProjectName,

    projectDescription,
    setProjectDescription,

    editingProjectId,
    setEditingProjectId,

    editingName,
    setEditingName,

    editingDescription,
    setEditingDescription,
  };
}