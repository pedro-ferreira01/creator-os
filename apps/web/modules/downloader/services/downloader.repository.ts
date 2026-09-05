import type { SupabaseClient } from "@supabase/supabase-js";

import type {
  DownloadItem,
  DownloadPlatform,
  DownloadStatus,
} from "../types";

type DownloadRow = {
  id: string;
  user_id: string;
  url: string;
  platform: string;
  status: string;
  progress: number;
  title: string | null;
  thumbnail_url: string | null;
  file_name: string | null;
  file_url: string | null;
};

type CreateDownloadRow = {
  user_id: string;
  url: string;
  platform: DownloadPlatform;
  status: DownloadStatus;
  progress: number;
  title: string | null;
  thumbnail_url: string | null;
  file_name: string | null;
  file_url: string | null;
};

type UpdateDownloadRow = Partial<
  Omit<CreateDownloadRow, "user_id">
>;

function mapDownloadRow(
  row: DownloadRow
): DownloadItem {
  return {
    id: row.id,
    userId: row.user_id,
    url: row.url,
    platform:
      row.platform as DownloadPlatform,
    status:
      row.status as DownloadStatus,
    progress: row.progress,
    title: row.title,
    thumbnailUrl:
      row.thumbnail_url,
    fileName: row.file_name,
    fileUrl: row.file_url,
    errorMessage: null,
    createdAt: "",
    updatedAt: null,
  };
}

export const downloaderRepository = {
  async create(
    supabase: SupabaseClient,
    input: {
      userId: string;
      url: string;
      platform: DownloadPlatform;
    }
  ): Promise<DownloadItem> {
    const row: CreateDownloadRow = {
      user_id: input.userId,
      url: input.url,
      platform: input.platform,
      status: "Pendente",
      progress: 0,
      title: null,
      thumbnail_url: null,
      file_name: null,
      file_url: null,
    };

    const {
      data,
      error,
    } = await supabase
      .from("downloads")
      .insert(row)
      .select()
      .single();

    if (error) {
      throw new Error(
        `Não foi possível salvar o download: ${error.message}`
      );
    }

    return mapDownloadRow(
      data as DownloadRow
    );
  },

  async update(
    supabase: SupabaseClient,
    id: string,
    updates: UpdateDownloadRow
  ): Promise<DownloadItem> {
    const {
      data,
      error,
    } = await supabase
      .from("downloads")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(
        `Não foi possível atualizar o download: ${error.message}`
      );
    }

    return mapDownloadRow(
      data as DownloadRow
    );
  },

  async findById(
    supabase: SupabaseClient,
    id: string
  ): Promise<DownloadItem | null> {
    const {
      data,
      error,
    } = await supabase
      .from("downloads")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw new Error(
        `Não foi possível buscar o download: ${error.message}`
      );
    }

    if (!data) {
      return null;
    }

    return mapDownloadRow(
      data as DownloadRow
    );
  },

  async findAllByUser(
    supabase: SupabaseClient,
    userId: string
  ): Promise<DownloadItem[]> {
    const {
      data,
      error,
    } = await supabase
      .from("downloads")
      .select("*")
      .eq("user_id", userId)
      .order("id", {
        ascending: false,
      });

    if (error) {
      throw new Error(
        `Não foi possível buscar os downloads: ${error.message}`
      );
    }

    return (
      (data as DownloadRow[] | null) ?? []
    ).map(mapDownloadRow);
  },

  async delete(
    supabase: SupabaseClient,
    id: string
  ): Promise<void> {
    const {
      error,
    } = await supabase
      .from("downloads")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(
        `Não foi possível excluir o download: ${error.message}`
      );
    }
  },
};