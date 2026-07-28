// src/pages/RegisterPage.tsx
import { useState } from "react";
import type { FormEvent, JSX } from "react";
import { useAuth } from "../features/auth/authenticator";
import { getAuthErrorMessage } from "../features/auth/authErrors";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage(): JSX.Element {
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
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
    <form onSubmit={handleSubmit}>
      <h2>Crear cuenta</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={submitting}>{submitting ? "Creando..." : "Registrarse"}</button>
      <button type="button" onClick={handleGoogleRegister} disabled={submitting}>Registrarse con Google</button>
      <p>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
    </form>
  );
}

export default RegisterPage;