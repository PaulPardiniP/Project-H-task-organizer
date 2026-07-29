// src/pages/LoginPage.tsx
import { useState } from "react";
import type { SyntheticEvent, JSX } from "react";
import { useAuth } from "../features/auth/Authenticator";
import { getAuthErrorMessage } from "../features/auth/AuthErrors";
import { useNavigate, useLocation, Link } from "react-router-dom";

interface LocationState {
  from?: { pathname: string };
}

function LoginPage(): JSX.Element {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const destino = state?.from?.pathname || "/dashboard";

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate(destino, { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setSubmitting(true);
    try {
      await signInWithGoogle();
      navigate(destino, { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="app-shell">
      <div className="auth-card">
      <form onSubmit={handleSubmit} className="form-row">
        <h2>Iniciar sesión</h2>

        <label className="form-row">
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label className="form-row">
          Contraseña
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        {error && <p className="alert-error" role="alert">{error}</p>}

        <div className="task-actions">
          <button type="submit" disabled={submitting}>
            {submitting ? "Ingresando..." : "Iniciar sesión"}
          </button>
          <button type="button" className="secondary" onClick={handleGoogleLogin} disabled={submitting}>
            Ingresar con Google
          </button>
        </div>

        <p className="muted">
          ¿No tenés cuenta? <Link to="/register">Registrate</Link>
        </p>
      </form>
    </div>
    </div>
  );
}

export default LoginPage;