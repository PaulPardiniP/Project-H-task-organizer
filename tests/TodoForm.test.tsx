import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TodoForm from "../src/components/TodoForm";
import * as tasksService from "../src/services/tasks";

vi.mock("../src/services/tasks", () => ({
  addTask: vi.fn().mockResolvedValue("fake-id"),
}));

describe("TodoForm", () => {
  it("llama a addTask con los datos correctos al enviar", async () => {
    render(<TodoForm userId="user123" />);

    await userEvent.type(screen.getByPlaceholderText("Título"), "Nueva tarea");
    await userEvent.click(screen.getByRole("button", { name: /agregar tarea/i }));

    expect(tasksService.addTask).toHaveBeenCalledWith({
      title: "Nueva tarea",
      description: "",
      userId: "user123",
    });
  });

  it("no envía si el título está vacío", async () => {
    render(<TodoForm userId="user123" />);

    const boton = screen.getByRole("button", { name: /agregar tarea/i });
    expect(boton).toBeDisabled();
  });
});