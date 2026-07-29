import { useState } from "react";
import type { Task } from "../types/task";
import { buildTodoSummary } from "../utils/buildTodoSummary";
import { useEffect } from "react";

interface SendSummaryButtonProps {
  tasks: Task[];
  email: string;
}

function SendSummaryButton({ tasks, email }: SendSummaryButtonProps) {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
  if (status === "success" || status === "error") {
    const timer = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(timer);
  }
  }, [status]);

  async function handleSend() {
    setSending(true);
    setStatus("idle");
    try {
      const summary = buildTodoSummary(tasks);
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email, summary }),
      });
      if (!res.ok) throw new Error("Send failed");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
      <div className="summary-block">
        <button type="button" className="btn-summary" onClick={handleSend} disabled={sending}>
          {sending ? "Enviando..." : "Enviar resumen por email"}
        </button>
        {status === "success" && <p className="alert-status" role="status">Resumen enviado correctamente.</p>}
        {status === "error" && <p className="alert-error" role="alert">No se pudo enviar el resumen.</p>}
      </div>
  );
}

export default SendSummaryButton;