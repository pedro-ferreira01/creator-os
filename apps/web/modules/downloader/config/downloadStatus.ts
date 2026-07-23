import type { DownloadStatus } from "../types";

export const downloadStatusConfig: Record<
  DownloadStatus,
  {
    color: string;
    action: string;
    canDelete: boolean;
  }
> = {
  Pendente: {
    color: "#f59e0b",
    action: "Iniciar",
    canDelete: true,
  },

  Baixando: {
    color: "#3b82f6",
    action: "Cancelar",
    canDelete: true,
  },

  Concluído: {
    color: "#22c55e",
    action: "Abrir",
    canDelete: true,
  },

  Erro: {
    color: "#ef4444",
    action: "Tentar novamente",
    canDelete: true,
  },
};