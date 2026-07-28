import type { Task } from "../types/task";

export function buildTodoSummary(todos: Task[]): string {
  const pendientes = todos.filter((t) => !t.completed);
  const completadas = todos.filter((t) => t.completed);

  const lineasPendientes = pendientes.map((t) => `- ${t.title}`).join("\n") || "(ninguna)";
  const lineasCompletadas = completadas.map((t) => `- ${t.title}`).join("\n") || "(ninguna)";

  return `Resumen de tus tareas en MateCode

Pendientes (${pendientes.length}):
${lineasPendientes}

Completadas (${completadas.length}):
${lineasCompletadas}`;
}