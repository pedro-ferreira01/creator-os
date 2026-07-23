export function getStatusColor(status: string) {
  switch (status) {
    case "Concluído":
      return "#22c55e";

    case "Em andamento":
      return "#3b82f6";

    default:
      return "#f59e0b";
  }
}

export function getPriorityColor(priority: string) {
  switch (priority) {
    case "Alta":
      return "#ef4444";

    case "Média":
      return "#f59e0b";

    default:
      return "#22c55e";
  }
}