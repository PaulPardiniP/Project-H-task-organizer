import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SendSummaryButton from "../src/components/SendSummaryButton";
import type { Task } from "../src/types/task";

const tasks: Task[] = [
  { id: "1", title: "Tarea A", completed: false, description: "", userId: "u1", createdAt: null },
];

describe("SendSummaryButton", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("muestra mensaje de éxito cuando el envío funciona", async () => {
    (fetch as any).mockResolvedValue({ ok: true });

    render(<SendSummaryButton tasks={tasks} email="user@test.com" />);
    await userEvent.click(screen.getByRole("button", { name: /enviar resumen/i }));

    expect(await screen.findByText(/enviado correctamente/i)).toBeInTheDocument();
  });

  it("muestra mensaje de error cuando el serverless falla", async () => {
    (fetch as any).mockResolvedValue({ ok: false });

    render(<SendSummaryButton tasks={tasks} email="user@test.com" />);
    await userEvent.click(screen.getByRole("button", { name: /enviar resumen/i }));

    expect(await screen.findByText(/no se pudo enviar/i)).toBeInTheDocument();
  });
});