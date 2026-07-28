// src/components/TodoForm.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { addTask } from "../services/tasks";

interface TodoFormProps {
  userId: string;
}

function TodoForm({ userId }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSending(true);
    setError(null);
    try {
      await addTask({ title: title.trim(), description: description.trim(), userId });
      setTitle("");
      setDescription("");
    } catch {
      setError("No se pudo crear la tarea.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" disabled={sending} required />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" disabled={sending} />
      <button type="submit" disabled={sending || !title.trim()}>{sending ? "Guardando..." : "Agregar tarea"}</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}

export default TodoForm;