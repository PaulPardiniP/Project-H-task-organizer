import { describe, it, expect } from "vitest";
import { buildTodoSummary } from "../src/utils/buildTodoSummary";
import type { Task } from "../src/types/task";

const baseTask: Omit<Task, "id" | "title" | "completed"> = {
  description: "",
  userId: "user1",
  createdAt: null,
};

describe("buildTodoSummary", () => {
  it("cuenta correctamente pendientes y completadas", () => {
    const tasks: Task[] = [
      { id: "1", title: "Tarea A", completed: false, ...baseTask },
      { id: "2", title: "Tarea B", completed: true, ...baseTask },
    ];
    const summary = buildTodoSummary(tasks);
    expect(summary).toContain("Pendientes (1)");
    expect(summary).toContain("Completadas (1)");
    expect(summary).toContain("Tarea A");
    expect(summary).toContain("Tarea B");
  });

  it("maneja una lista vacía sin romper", () => {
    const summary = buildTodoSummary([]);
    expect(summary).toContain("Pendientes (0)");
    expect(summary).toContain("Completadas (0)");
    expect(summary).toContain("(ninguna)");
  });
});