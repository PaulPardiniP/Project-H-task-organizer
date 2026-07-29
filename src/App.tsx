import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RequireAuth from "./routes/RequireAuth";
import { useAuth } from "./features/auth/Authenticator";
import { useTasks } from "./hooks/useTasks";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SendSummaryButton from "./components/SendSummaryButton";
import { useTheme } from "./hooks/useTheme";

function DashboardPage() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { tasks, loading, error } = useTasks(user?.uid || "");

  return (
   <div className= "dashboard-bg"> 
    <div className="app-shell">
      <header className="app-header">
        <h2>MateCode</h2>
        <div className="header-actions">
          <button type="button" className="icon-toggle" onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
              <button
                type="button"
                className="secondary"
                onClick={async () => {
                  await logout();
                  window.location.href = "/login";
                }}
              >
                Cerrar sesión
              </button>
          <span className="muted">{user?.email}</span>
        </div>  
      </header>

      <TodoForm userId={user?.uid || ""} />
      <SendSummaryButton tasks={tasks} email={user?.email || ""} />

      {loading && <p className="muted">Cargando tareas...</p>}
      {error && <p className="alert-error" role="alert">{error}</p>}
      {!loading && !error && <TodoList tasks={tasks} />}
    </div>
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