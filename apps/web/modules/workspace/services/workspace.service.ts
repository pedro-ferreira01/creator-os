import type {
  WorkspaceProject,
  CreateWorkspaceProject,
  WorkspacePriority,
  WorkspaceStatus,
} from "../types";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

async function parseResponse<T>(
  response: Response
): Promise<T> {
  const contentType =
    response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    if (!response.ok) {
      throw new Error(
        `Erro na API: ${response.status}`
      );
    }

    throw new Error(
      "A API retornou uma resposta inválida."
    );
  }

  const body =
    (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(
      body.error ??
        "Não foi possível concluir a operação."
    );
  }

  if (body.data === undefined) {
    throw new Error(
      "A API não retornou os dados esperados."
    );
  }

  return body.data;
}

export const workspaceService = {
  async getProjects(): Promise<
    WorkspaceProject[]
  > {
    const response = await fetch(
      "/api/workspace/projects",
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return parseResponse<
      WorkspaceProject[]
    >(response);
  },

  async getProjectById(
    id: string
  ): Promise<WorkspaceProject> {
    const response = await fetch(
      `/api/workspace/projects/${encodeURIComponent(
        id
      )}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return parseResponse<WorkspaceProject>(
      response
    );
  },

 async createProject(
  project: CreateWorkspaceProject
): Promise<WorkspaceProject> {
    const response = await fetch(
      "/api/workspace/projects",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name: project.name,
          description:
            project.description,
          category:
            project.category,
          status:
            project.status as WorkspaceStatus,
          priority:
            project.priority as WorkspacePriority,
          progress:
            project.progress,
          pinned:
            project.pinned,
          favorite:
            project.favorite,
          archived:
            project.archived,
          
          createdAt:
            project.createdAt,
          dueDate:
            project.dueDate,
          color:
            project.color,
          tags:
            project.tags,
        }),
      }
    );

    return parseResponse<WorkspaceProject>(
      response
    );
  },

  async updateProject(
    project: WorkspaceProject
  ): Promise<WorkspaceProject> {
    const response = await fetch(
      `/api/workspace/projects/${encodeURIComponent(
        project.id
      )}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name: project.name,
          description:
            project.description,
          category:
            project.category,
          status:
            project.status as WorkspaceStatus,
          priority:
            project.priority as WorkspacePriority,
          progress:
            project.progress,
          pinned:
            project.pinned,
          favorite:
            project.favorite,
          archived:
            project.archived,
          owner:
            project.owner,
          dueDate:
            project.dueDate,
          color:
            project.color,
          tags:
            project.tags,
        }),
      }
    );

    return parseResponse<WorkspaceProject>(
      response
    );
  },

  async deleteProject(
    id: string
  ): Promise<void> {
    const response = await fetch(
      `/api/workspace/projects/${encodeURIComponent(
        id
      )}`,
      {
        method: "DELETE",
      }
    );

    await parseResponse<null>(response);
  },
};