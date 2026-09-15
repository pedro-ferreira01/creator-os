import type { SupabaseClient } from "@supabase/supabase-js";

import type {
  WorkspacePriority,
  WorkspaceProject,
  WorkspaceStatus,
} from "../types";

type WorkspaceRow = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  progress: number;
  pinned: boolean;
  favorite: boolean;
  archived: boolean;
  owner: string;
  created_at: string;
  due_date: string | null;
  color: string;
  tags: string[];
  updated_at: string;
};

type CreateWorkspaceRow = {
  user_id: string;
  name: string;
  description: string;
  category: string;
  status: WorkspaceStatus;
  priority: WorkspacePriority;
  progress: number;
  pinned: boolean;
  favorite: boolean;
  archived: boolean;
  owner: string;
  created_at: string;
  due_date: string | null;
  color: string;
  tags: string[];
};

type UpdateWorkspaceRow = Partial<
  Omit<CreateWorkspaceRow, "user_id">
>;

function mapWorkspaceRow(
  row: WorkspaceRow
): WorkspaceProject {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    status:
      row.status as WorkspaceStatus,
    priority:
      row.priority as WorkspacePriority,
    progress: row.progress,
    pinned: row.pinned,
    favorite: row.favorite,
    archived: row.archived,
    owner: row.owner,
    createdAt: row.created_at,
    dueDate: row.due_date,
    color: row.color,
    tags: row.tags ?? [],
    updatedAt: row.updated_at,
  };
}

export const workspaceRepository = {
  async create(
    supabase: SupabaseClient,
    input: {
      userId: string;
      name: string;
      description: string;
      category: string;
      status: WorkspaceStatus;
      priority: WorkspacePriority;
      progress: number;
      pinned: boolean;
      favorite: boolean;
      archived: boolean;
      owner: string;
      createdAt: string;
      dueDate: string | null;
      color: string;
      tags: string[];
    }
  ): Promise<WorkspaceProject> {
    const row: CreateWorkspaceRow = {
      user_id: input.userId,
      name: input.name,
      description: input.description,
      category: input.category,
      status: input.status,
      priority: input.priority,
      progress: input.progress,
      pinned: input.pinned,
      favorite: input.favorite,
      archived: input.archived,
      owner: input.owner,
      created_at: input.createdAt,
      due_date: input.dueDate,
      color: input.color,
      tags: input.tags,
    };

    const { data, error } =
      await supabase
        .from("workspace_projects")
        .insert(row)
        .select()
        .single();

    if (error) {
      throw new Error(
        `Não foi possível salvar o projeto: ${error.message}`
      );
    }

    return mapWorkspaceRow(
      data as WorkspaceRow
    );
  },

  async update(
    supabase: SupabaseClient,
    id: string,
    updates: UpdateWorkspaceRow
  ): Promise<WorkspaceProject> {
    const { data, error } =
      await supabase
        .from("workspace_projects")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw new Error(
        `Não foi possível atualizar o projeto: ${error.message}`
      );
    }

    return mapWorkspaceRow(
      data as WorkspaceRow
    );
  },

  async findById(
    supabase: SupabaseClient,
    id: string
  ): Promise<WorkspaceProject | null> {
    const { data, error } =
      await supabase
        .from("workspace_projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
      throw new Error(
        `Não foi possível buscar o projeto: ${error.message}`
      );
    }

    if (!data) {
      return null;
    }

    return mapWorkspaceRow(
      data as WorkspaceRow
    );
  },

  async findAllByUser(
    supabase: SupabaseClient,
    userId: string
  ): Promise<WorkspaceProject[]> {
    const { data, error } =
      await supabase
        .from("workspace_projects")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", {
          ascending: false,
        });

    if (error) {
      throw new Error(
        `Não foi possível buscar os projetos: ${error.message}`
      );
    }

    return (
      (data as WorkspaceRow[] | null) ?? []
    ).map(mapWorkspaceRow);
  },

  async delete(
    supabase: SupabaseClient,
    id: string
  ): Promise<void> {
    const { error } =
      await supabase
        .from("workspace_projects")
        .delete()
        .eq("id", id);

    if (error) {
      throw new Error(
        `Não foi possível excluir o projeto: ${error.message}`
      );
    }
  },
};