// src/components/TodoList.tsx
import { useState } from "react";
import type { Task } from "../types/task";
import { toggleTaskCompleted, deleteTask, updateTask } from "../services/tasks";

interface TodoListProps {
  tasks: Task[];
}

function TodoList({ tasks }: TodoListProps) {
  if (tasks.length === 0) return <p className="muted">No tenés tareas todavía.</p>;
  return (
    <ul className="task-list">
      {tasks.map((task) => <TodoItem key={task.id} task={task} />)}
    </ul>
  );
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
      <li className="task-card">
        <div className="form-row">
          <input value={title} onChange={(e) => setTitle(e.target.value)} disabled={busy} />
          <input value={description} onChange={(e) => setDescription(e.target.value)} disabled={busy} />
        </div>
        <div className="task-actions">
          <button onClick={handleSaveEdit} disabled={busy || !title.trim()}>Guardar</button>
          <button type="button" className="secondary" onClick={() => setEditing(false)} disabled={busy}>Cancelar</button>
        </div>
      </li>
    );
  }

  return (
    <li className="task-card">
      <div className="task-card-top">
        <button
        type="button"
        className={`task-led ${task.completed ? "completed" : ""}`}
        onClick={handleToggle}
        disabled={busy}
        aria-label={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
      />
        <span className={`task-title ${task.completed ? "completed" : ""}`}>{task.title}</span>
      </div>
      {task.description && <p className="task-description">{task.description}</p>}
      <div className="task-actions">
        <button type="button" className="secondary" onClick={() => setEditing(true)} disabled={busy}>Editar</button>
        <button type="button" className="danger" onClick={handleDelete} disabled={busy}>Eliminar</button>
      </div>
    </li>
  );
}

export default TodoList;