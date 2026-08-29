export type WorkspaceDeadlineState =
  | "sem-prazo"
  | "em-dia"
  | "proximo"
  | "atrasado";

export function getWorkspaceDeadlineState(
  dueDate: string | null
): WorkspaceDeadlineState {
  if (!dueDate) {
    return "sem-prazo";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadline = new Date(
    `${dueDate}T00:00:00`
  );

  if (Number.isNaN(deadline.getTime())) {
    return "sem-prazo";
  }

  const differenceInDays =
    Math.ceil(
      (deadline.getTime() -
        today.getTime()) /
        (1000 * 60 * 60 * 24)
    );

  if (differenceInDays < 0) {
    return "atrasado";
  }

  if (differenceInDays <= 3) {
    return "proximo";
  }

  return "em-dia";
}

export function getWorkspaceDeadlineLabel(
  dueDate: string | null
): string {
  const state =
    getWorkspaceDeadlineState(dueDate);

  switch (state) {
    case "sem-prazo":
      return "Sem prazo";

    case "atrasado":
      return "Prazo atrasado";

    case "proximo":
      return "Prazo próximo";

    case "em-dia":
      return "No prazo";
  }
}