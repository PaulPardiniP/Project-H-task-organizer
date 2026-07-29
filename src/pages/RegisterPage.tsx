// src/pages/RegisterPage.tsx
import { useState } from "react";
import type {SyntheticEvent, JSX } from "react";
import { useAuth } from "../features/auth/Authenticator";
import { getAuthErrorMessage } from "../features/auth/AuthErrors";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage(): JSX.Element {
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signUp(email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleRegister() {
    setError("");
    setSubmitting(true);
    try {
      await signInWithGoogle();
      navigate("/dashboard", { replace: true });
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
        <h2>Crear cuenta</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password min 6 caracteres" required minLength={6} />
        {error && <p className="alert-error" role="alert">{error}</p>}
        <div className="task-actions">
          <button type="submit" disabled={submitting}>{submitting ? "Creando..." : "Registrarse"}</button>
          <button type="button" className="secondary" onClick={handleGoogleRegister} disabled={submitting}>Registrarse con Google</button>
        </div>
        <p className="muted">¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
      </form>
    </div>
  </div>
);
}

export default RegisterPage;