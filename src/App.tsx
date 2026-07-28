import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RequireAuth from "./routes/RequireAuth";
import { useAuth } from "./features/auth/authenticator";
import { useTasks } from "./hooks/useTasks";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function DashboardPage() {
  const { user, logout } = useAuth();
  const { tasks, loading, error } = useTasks(user?.uid || "");

  return (
    <div>
      <header>
        <h2>MateCode</h2>
        <p>Hola, {user?.email}</p>
        <button onClick={() => logout()}>Cerrar sesión</button>
      </header>

      <TodoForm userId={user?.uid || ""} />

      {loading && <p>Cargando tareas...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && <TodoList tasks={tasks} />}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;