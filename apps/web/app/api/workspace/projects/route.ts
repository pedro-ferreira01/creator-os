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

type CreateWorkspaceInput = {
  name: string;
  description?: string;
  category?: string;
  status?: WorkspaceStatus;
  priority?: WorkspacePriority;
  progress?: number;
  pinned?: boolean;
  favorite?: boolean;
  archived?: boolean;
  createdAt?: string;
  dueDate?: string | null;
  color?: string;
  tags?: string[];
};

export async function GET() {
  try {
    // ==========================
    // Autenticação
    // ==========================

    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error:
            "Usuário não autenticado.",
        },
        { status: 401 }
      );
    }

    // ==========================
    // Buscar projetos do usuário
    // ==========================

    const projects =
      await workspaceRepository.findAllByUser(
        supabase,
        user.id
      );

    return NextResponse.json(
      {
        data: projects,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Não foi possível carregar os projetos.";

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    // ==========================
    // Autenticação
    // ==========================

    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error:
            "Usuário não autenticado.",
        },
        { status: 401 }
      );
    }

    // ==========================
    // Ler body
    // ==========================

    const body =
      (await request.json()) as Partial<CreateWorkspaceInput>;

    // ==========================
    // Validar nome
    // ==========================

    if (
      typeof body.name !== "string" ||
      !body.name.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "O nome do projeto é obrigatório.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // Validar status
    // ==========================

    const status =
      body.status ?? "Planejamento";

    if (
      !VALID_STATUSES.includes(status)
    ) {
      return NextResponse.json(
        {
          error:
            "Status de projeto inválido.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // Validar prioridade
    // ==========================

    const priority =
      body.priority ?? "Média";

    if (
      !VALID_PRIORITIES.includes(priority)
    ) {
      return NextResponse.json(
        {
          error:
            "Prioridade de projeto inválida.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // Validar progresso
    // ==========================

    const progress =
      body.progress ?? 0;

    if (
      typeof progress !== "number" ||
      !Number.isInteger(progress) ||
      progress < 0 ||
      progress > 100
    ) {
      return NextResponse.json(
        {
          error:
            "O progresso deve ser um número inteiro entre 0 e 100.",
        },
        { status: 400 }
      );
    }

    // ==========================
    // Validar tags
    // ==========================

    const tags =
      body.tags ?? [];

    if (
      !Array.isArray(tags) ||
      tags.some(
        (tag) => typeof tag !== "string"
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

    // ==========================
    // Criar projeto
    // ==========================

    const project =
      await workspaceRepository.create(
        supabase,
        {
          userId: user.id,
          name: body.name.trim(),
          description:
            typeof body.description === "string"
              ? body.description.trim()
              : "",
          category:
            typeof body.category === "string"
              ? body.category.trim()
              : "Workspace",
          status,
          priority,
          progress,
          pinned:
            body.pinned ?? false,
          favorite:
            body.favorite ?? false,
          archived:
            body.archived ?? false,
            owner:
  typeof user.user_metadata?.full_name === "string" &&
  user.user_metadata.full_name.trim()
    ? user.user_metadata.full_name.trim()
    : user.email ?? "",
          createdAt:
            typeof body.createdAt === "string" &&
            body.createdAt
              ? body.createdAt
              : new Date()
                  .toISOString()
                  .slice(0, 10),
          dueDate:
            body.dueDate ?? null,
          color:
            typeof body.color === "string" &&
            body.color
              ? body.color
              : "#3b82f6",
          tags,
        }
      );

    return NextResponse.json(
      {
        data: project,
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Não foi possível criar o projeto.";

    console.error(
      "Erro ao criar projeto:",
      error
    );

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}