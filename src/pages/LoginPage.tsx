// src/pages/LoginPage.tsx
import { useState } from "react";
import type { FormEvent, JSX } from "react";
import { useAuth } from "../features/auth/authenticator";
import { getAuthErrorMessage } from "../features/auth/authErrors";
import { useNavigate, useLocation, Link } from "react-router-dom";

interface LocationState {
  from?: { pathname: string };
}

function LoginPage(): JSX.Element {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const destino = state?.from?.pathname || "/dashboard";

  async function handleSubmit(e: FormEvent): Promise<void> {
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

  async function handleGoogleLogin(): Promise<void> {
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
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Contraseña
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      {error && <p role="alert" style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Ingresando..." : "Iniciar sesión"}
      </button>

      <button type="button" onClick={handleGoogleLogin} disabled={submitting}>
        Ingresar con Google
      </button>

      <p>
        ¿No tenés cuenta? <Link to="/register">Registrate</Link>
      </p>
    </form>
  );
}

export default LoginPage;