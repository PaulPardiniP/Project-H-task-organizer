// src/components/TodoList.tsx
import { useState } from "react";
import type { Task } from "../types/task";
import { toggleTaskCompleted, deleteTask, updateTask } from "../services/tasks";

interface TodoListProps {
  tasks: Task[];
}

function TodoList({ tasks }: TodoListProps) {
  if (tasks.length === 0) return <p>No tenés tareas todavía.</p>;
  return <ul>{tasks.map((task) => <TodoItem key={task.id} task={task} />)}</ul>;
}

function TodoItem({ task }: { task: Task }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [busy, setBusy] = useState(false);

  async function handleToggle() {
    setBusy(true);
    try { await toggleTaskCompleted(task.id, !task.completed); } finally { setBusy(false); }
  }
  async function handleDelete() {
    setBusy(true);
    try { await deleteTask(task.id); } finally { setBusy(false); }
  }
  async function handleSaveEdit() {
    if (!title.trim()) return;
    setBusy(true);
    try {
      await updateTask(task.id, { title: title.trim(), description: description.trim() });
      setEditing(false);
    } finally { setBusy(false); }
  }

  if (editing) {
    return (
      <li>
        <input value={title} onChange={(e) => setTitle(e.target.value)} disabled={busy} />
        <input value={description} onChange={(e) => setDescription(e.target.value)} disabled={busy} />
        <button onClick={handleSaveEdit} disabled={busy || !title.trim()}>Guardar</button>
        <button type="button" onClick={() => setEditing(false)} disabled={busy}>Cancelar</button>
      </li>
    );
  }

  return (
    <li>
      <input type="checkbox" checked={task.completed} onChange={handleToggle} disabled={busy} />
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</span>
      {task.description && <p>{task.description}</p>}
      <button type="button" onClick={() => setEditing(true)} disabled={busy}>Editar</button>
      <button type="button" onClick={handleDelete} disabled={busy}>Eliminar</button>
    </li>
  );
}

export default TodoList;