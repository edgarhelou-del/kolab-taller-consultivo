'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const fecha = (f) => (f ? new Date(f).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' }) : 'Nunca');

async function llamar(url, method, body) {
  const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || 'No se pudo completar la acción.');
  return d;
}

function Credenciales({ c, cerrar }) {
  const [copiado, setCopiado] = useState(false);
  const texto = `Usuario: ${c.usuario}\nClave temporal: ${c.clave}`;
  return (
    <div className="credenciales" role="status">
      <h3>Credenciales de {c.usuario}</h3>
      <p>Cópialas ahora: la clave no se vuelve a mostrar. La persona deberá cambiarla la primera vez que ingrese.</p>
      <pre>{texto}</pre>
      <div className="fila-botones">
        <button type="button" className="boton oscuro" onClick={async () => { await navigator.clipboard.writeText(texto); setCopiado(true); }}>{copiado ? 'Copiado' : 'Copiar'}</button>
        <button type="button" className="boton claro" onClick={cerrar}>Listo</button>
      </div>
    </div>
  );
}

export default function AdminUsuarios({ usuarios, yoId }) {
  const router = useRouter();
  const vacio = { nombre: '', usuario: '', clave: '', rol: 'participante' };
  const [f, setF] = useState(vacio);
  const [error, setError] = useState(null);
  const [cred, setCred] = useState(null);
  const [borrar, setBorrar] = useState(null);
  const [ocupado, setOcupado] = useState(false);
  const cambio = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function accion(fn) {
    setError(null);
    setOcupado(true);
    try {
      await fn();
      router.refresh();
    } catch (e) {
      setError(e.message);
    }
    setOcupado(false);
  }

  const crear = (e) => {
    e.preventDefault();
    accion(async () => {
      const d = await llamar('/api/admin/usuarios', 'POST', f);
      setCred({ usuario: d.usuario, clave: d.clave });
      setF(vacio);
    });
  };

  return (
    <>
      {cred && <Credenciales c={cred} cerrar={() => setCred(null)} />}
      {error && <p className="msg-error" role="alert">{error}</p>}

      <section className="tarjeta">
        <h2>Crear usuario</h2>
        <form className="form-rejilla" onSubmit={crear}>
          <label>Nombre<input required maxLength={120} value={f.nombre} onChange={cambio('nombre')} autoComplete="off" /></label>
          <label>Usuario<input required value={f.usuario} onChange={cambio('usuario')} autoComplete="off" autoCapitalize="none" placeholder="nombre.apellido" /></label>
          <label>Clave <small>(déjala vacía para generarla)</small><input type="text" minLength={10} maxLength={72} value={f.clave} onChange={cambio('clave')} autoComplete="off" /></label>
          <label>Rol
            <select value={f.rol} onChange={cambio('rol')}><option value="participante">Participante</option><option value="admin">Administrador</option></select>
          </label>
          <button className="boton oro" disabled={ocupado}>Crear usuario</button>
        </form>
      </section>

      <section className="tarjeta">
        <h2>Usuarios <span className="insignia">{usuarios.length}</span></h2>
        <div className="tabla-envoltura"><table className="tabla-usuarios">
          <thead><tr><th>Nombre</th><th>Usuario</th><th>Rol</th><th>Estado</th><th>Último ingreso</th><th>Acciones</th></tr></thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className={u.activo ? '' : 'inactivo'}>
                <td>{u.nombre}{String(u.id) === String(yoId) && <small> (tú)</small>}</td>
                <td><code>{u.usuario}</code></td>
                <td>{u.rol === 'admin' ? 'Administrador' : 'Participante'}</td>
                <td>{!u.activo ? 'Desactivado' : u.debe_cambiar_clave ? 'Clave temporal' : 'Activo'}</td>
                <td>{fecha(u.ultimo_ingreso)}</td>
                <td className="acciones">
                  {borrar === u.id ? (
                    <span className="confirmar-linea">
                      ¿Eliminar a esta persona y su cuaderno?
                      <button type="button" className="peligro" onClick={() => { setBorrar(null); accion(() => llamar(`/api/admin/usuarios/${u.id}`, 'DELETE')); }}>Sí, eliminar</button>
                      <button type="button" onClick={() => setBorrar(null)}>Cancelar</button>
                    </span>
                  ) : (
                    <>
                      <button type="button" disabled={ocupado} onClick={() => accion(async () => { const d = await llamar(`/api/admin/usuarios/${u.id}`, 'PATCH', { accion: 'clave' }); setCred({ usuario: u.usuario, clave: d.clave }); })}>Nueva clave</button>
                      {String(u.id) !== String(yoId) && <>
                        <button type="button" disabled={ocupado} onClick={() => accion(() => llamar(`/api/admin/usuarios/${u.id}`, 'PATCH', { accion: 'activo', valor: !u.activo }))}>{u.activo ? 'Desactivar' : 'Activar'}</button>
                        <button type="button" disabled={ocupado} onClick={() => accion(() => llamar(`/api/admin/usuarios/${u.id}`, 'PATCH', { accion: 'rol', valor: u.rol === 'admin' ? 'participante' : 'admin' }))}>{u.rol === 'admin' ? 'Quitar admin' : 'Hacer admin'}</button>
                        <button type="button" className="peligro" onClick={() => setBorrar(u.id)}>Eliminar</button>
                      </>}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
        <p className="ayuda chico">Generar una clave nueva cierra las sesiones abiertas de esa persona y le pide cambiarla al ingresar. Su cuaderno se conserva. Como administrador no puedes ver las respuestas de los participantes.</p>
      </section>
    </>
  );
}
