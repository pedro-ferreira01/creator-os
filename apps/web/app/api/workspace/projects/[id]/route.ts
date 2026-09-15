import { NextResponse } from "next/server";

import {
  createSupabaseServerClient,
} from "@/lib/supabase/server";

import {
  workspaceRepository,
} from "@/modules/workspace/services/workspace.repository";

import type {
  WorkspacePriority,
  WorkspaceStatus,
} from "@/modules/workspace/types";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const VALID_STATUSES: WorkspaceStatus[] = [
  "Planejamento",
  "Em andamento",
  "Concluído",
];

const VALID_PRIORITIES: WorkspacePriority[] = [
  "Alta",
  "Média",
  "Baixa",
];

type UpdateWorkspaceInput = {
  name?: string;
  description?: string;
  category?: string;
  status?: WorkspaceStatus;
  priority?: WorkspacePriority;
  progress?: number;
  pinned?: boolean;
  favorite?: boolean;
  archived?: boolean;
  owner?: string;
  dueDate?: string | null;
  color?: string;
  tags?: string[];
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Não autenticado.",
        },
        { status: 401 }
      );
    }

    const project =
      await workspaceRepository.findById(
        supabase,
        id
      );

    if (!project) {
      return NextResponse.json(
        {
          error: "Projeto não encontrado.",
        },
        { status: 404 }
      );
    }

    /*
     * O Repository consulta o projeto usando
     * o cliente autenticado do Supabase.
     *
     * O RLS garante que o usuário só tenha
     * acesso aos próprios projetos.
     */

    return NextResponse.json({
      data: project,
    });
  } catch (error) {
    console.error(
      "Erro ao consultar projeto:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível consultar o projeto.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Não autenticado.",
        },
        { status: 401 }
      );
    }

    // ==========================
    // Verificar existência
    // ==========================

    const existingProject =
      await workspaceRepository.findById(
        supabase,
        id
      );

    if (!existingProject) {
      return NextResponse.json(
        {
          error: "Projeto não encontrado.",
        },
        { status: 404 }
      );
    }

    // ==========================
    // Ler body
    // ==========================

    const body =
      (await request.json()) as Partial<UpdateWorkspaceInput>;

    const updates: Record<string, unknown> =
      {};

    // ==========================
    // Nome
    // ==========================

    if (body.name !== undefined) {
      if (
        typeof body.name !== "string" ||
        !body.name.trim()
      ) {
        return NextResponse.json(
          {
            error:
              "O nome do projeto não pode ser vazio.",
          },
          { status: 400 }
        );
      }

      updates.name =
        body.name.trim();
    }

    // ==========================
    // Descrição
    // ==========================

    if (
      body.description !== undefined
    ) {
      if (
        typeof body.description !== "string"
      ) {
        return NextResponse.json(
          {
            error:
              "A descrição deve ser um texto.",
          },
          { status: 400 }
        );
      }

      updates.description =
        body.description.trim();
    }

    // ==========================
    // Categoria
    // ==========================

    if (body.category !== undefined) {
      if (
        typeof body.category !== "string"
      ) {
        return NextResponse.json(
          {
            error:
              "A categoria deve ser um texto.",
          },
          { status: 400 }
        );
      }

      updates.category =
        body.category.trim();
    }

    // ==========================
    // Status
    // ==========================

    if (body.status !== undefined) {
      if (
        !VALID_STATUSES.includes(
          body.status
        )
      ) {
        return NextResponse.json(
          {
            error:
              "Status de projeto inválido.",
          },
          { status: 400 }
        );
      }

      updates.status =
        body.status;
    }

    // ==========================
    // Prioridade
    // ==========================

    if (
      body.priority !== undefined
    ) {
      if (
        !VALID_PRIORITIES.includes(
          body.priority
        )
      ) {
        return NextResponse.json(
          {
            error:
              "Prioridade de projeto inválida.",
          },
          { status: 400 }
        );
      }

      updates.priority =
        body.priority;
    }

    // ==========================
    // Progresso
    // ==========================

    if (
      body.progress !== undefined
    ) {
      if (
        typeof body.progress !== "number" ||
        !Number.isInteger(
          body.progress
        ) ||
        body.progress < 0 ||
        body.progress > 100
      ) {
        return NextResponse.json(
          {
            error:
              "O progresso deve ser um número inteiro entre 0 e 100.",
          },
          { status: 400 }
        );
      }

      updates.progress =
        body.progress;
    }

    // ==========================
    // Booleanos
    // ==========================

    if (
      body.pinned !== undefined
    ) {
      if (
        typeof body.pinned !== "boolean"
      ) {
        return NextResponse.json(
          {
            error:
              "O campo pinned deve ser booleano.",
          },
          { status: 400 }
        );
      }

      updates.pinned =
        body.pinned;
    }

    if (
      body.favorite !== undefined
    ) {
      if (
        typeof body.favorite !==
        "boolean"
      ) {
        return NextResponse.json(
          {
            error:
              "O campo favorite deve ser booleano.",
          },
          { status: 400 }
        );
      }

      updates.favorite =
        body.favorite;
    }

    if (
      body.archived !== undefined
    ) {
      if (
        typeof body.archived !==
        "boolean"
      ) {
        return NextResponse.json(
          {
            error:
              "O campo archived deve ser booleano.",
          },
          { status: 400 }
        );
      }

      updates.archived =
        body.archived;
    }

    // ==========================
    // Owner
    // ==========================

    if (body.owner !== undefined) {
      if (
        typeof body.owner !== "string"
      ) {
        return NextResponse.json(
          {
            error:
              "O proprietário deve ser um texto.",
          },
          { status: 400 }
        );
      }

      updates.owner =
        body.owner.trim();
    }

    // ==========================
    // Data de vencimento
    // ==========================

    if (
      body.dueDate !== undefined
    ) {
      if (
        body.dueDate !== null &&
        typeof body.dueDate !== "string"
      ) {
        return NextResponse.json(
          {
            error:
              "A data de vencimento é inválida.",
          },
          { status: 400 }
        );
      }

      updates.due_date =
        body.dueDate;
    }

    // ==========================
    // Cor
    // ==========================

    if (body.color !== undefined) {
      if (
        typeof body.color !== "string"
      ) {
        return NextResponse.json(
          {
            error:
              "A cor deve ser um texto.",
          },
          { status: 400 }
        );
      }

      updates.color =
        body.color;
    }

    // ==========================
    // Tags
    // ==========================

    if (body.tags !== undefined) {
      if (
        !Array.isArray(body.tags) ||
        body.tags.some(
          (tag) =>
            typeof tag !== "string"
        )
      ) {
        return NextResponse.json(
          {
            error:
              "As tags devem ser uma lista de textos.",
          },
          { status: 400 }
        );
      }

      updates.tags =
        body.tags;
    }

    // ==========================
    // Nada para atualizar
    // ==========================

    if (
      Object.keys(updates).length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Nenhuma alteração foi informada.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // Atualizar projeto
    // ==========================

    updates.updated_at =
      new Date().toISOString();

    const updatedProject =
      await workspaceRepository.update(
        supabase,
        id,
        updates
      );

    return NextResponse.json({
      data: updatedProject,
    });
  } catch (error) {
    console.error(
      "Erro ao atualizar projeto:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível atualizar o projeto.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Não autenticado.",
        },
        { status: 401 }
      );
    }

    // ==========================
    // Verificar existência
    // ==========================

    const project =
      await workspaceRepository.findById(
        supabase,
        id
      );

    if (!project) {
      return NextResponse.json(
        {
          error: "Projeto não encontrado.",
        },
        { status: 404 }
      );
    }

    // ==========================
    // Excluir
    // ==========================

    await workspaceRepository.delete(
      supabase,
      id
    );

    return NextResponse.json({
      data: null,
    });
  } catch (error) {
    console.error(
      "Erro ao excluir projeto:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível excluir o projeto.",
      },
      { status: 500 }
    );
  }
}