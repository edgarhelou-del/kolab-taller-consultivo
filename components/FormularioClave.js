'use client';
import { useState } from 'react';

export default function FormularioClave({ obligatorio }) {
  const [f, setF] = useState({ actual: '', nueva: '', repetir: '' });
  const [msg, setMsg] = useState(null);
  const [ocupado, setOcupado] = useState(false);
  const cambio = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function enviar(e) {
    e.preventDefault();
    if (f.nueva !== f.repetir) return setMsg({ error: 'Las claves nuevas no coinciden.' });
    setOcupado(true);
    setMsg(null);
    const r = await fetch('/api/cuenta/clave', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ actual: f.actual, nueva: f.nueva }) });
    const d = await r.json().catch(() => ({}));
    setOcupado(false);
    if (!r.ok) return setMsg({ error: d.error || 'No se pudo cambiar la clave.' });
    if (obligatorio) return window.location.assign('/');
    setF({ actual: '', nueva: '', repetir: '' });
    setMsg({ ok: 'Tu clave quedó actualizada.' });
  }

  return (
    <form onSubmit={enviar} className="form-apilado">
      <label>{obligatorio ? 'Clave que te asignaron' : 'Clave actual'}<input type="password" autoComplete="current-password" required value={f.actual} onChange={cambio('actual')} /></label>
      <label>Clave nueva <small>(mínimo 10 caracteres)</small><input type="password" autoComplete="new-password" required minLength={10} value={f.nueva} onChange={cambio('nueva')} /></label>
      <label>Repite la clave nueva<input type="password" autoComplete="new-password" required minLength={10} value={f.repetir} onChange={cambio('repetir')} /></label>
      {msg?.error && <p className="msg-error" role="alert">{msg.error}</p>}
      {msg?.ok && <p className="msg-ok" role="status">{msg.ok}</p>}
      <button className="boton oro" disabled={ocupado}>{ocupado ? 'Guardando…' : 'Cambiar clave'}</button>
    </form>
  );
}
