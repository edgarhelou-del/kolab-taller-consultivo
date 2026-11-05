'use client';
import { useState } from 'react';

export default function FormularioIngreso() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState(null);
  const [ocupado, setOcupado] = useState(false);

  async function enviar(e) {
    e.preventDefault();
    setOcupado(true);
    setError(null);
    try {
      const r = await fetch('/api/auth/ingresar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ usuario, clave }) });
      if (r.ok) return window.location.assign('/');
      const d = await r.json().catch(() => ({}));
      setError(d.error || 'No pudimos iniciar tu sesión. Inténtalo de nuevo.');
    } catch {
      setError('No hay conexión. Inténtalo de nuevo.');
    }
    setOcupado(false);
  }

  return (
    <form onSubmit={enviar} className="form-apilado">
      <label>Usuario<input required autoFocus autoCapitalize="none" autoComplete="username" value={usuario} onChange={(e) => setUsuario(e.target.value)} /></label>
      <label>Clave<input required type="password" autoComplete="current-password" value={clave} onChange={(e) => setClave(e.target.value)} /></label>
      {error && <p className="msg-error" role="alert">{error}</p>}
      <button className="boton oro" disabled={ocupado}>{ocupado ? 'Ingresando…' : 'Ingresar'}</button>
    </form>
  );
}
