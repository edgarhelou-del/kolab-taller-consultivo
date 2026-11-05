'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FASES, NOMBRE_CUADERNO } from '@/content/fases';
import { cargar, guardar, vaciar } from '@/lib/cuadernoCliente';

export function Respaldo({ alRestaurar }) {
  const ref = useRef(null);
  const [archivo, setArchivo] = useState(null);
  const [msg, setMsg] = useState(null);

  async function elegir(e) {
    const f = e.target.files[0];
    e.target.value = '';
    if (!f) return;
    try {
      setArchivo({ nombre: f.name, datos: JSON.parse(await f.text()) });
      setMsg(null);
    } catch {
      setMsg({ error: 'Este archivo no es un respaldo válido.' });
    }
  }
  async function restaurar() {
    await vaciar();
    const r = await fetch('/api/cuaderno', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(archivo.datos) });
    const d = await r.json().catch(() => ({}));
    setArchivo(null);
    if (!r.ok) return setMsg({ error: d.error || 'No se pudo restaurar.' });
    setMsg({ ok: 'Tu cuaderno quedó restaurado.' });
    alRestaurar?.();
  }

  return (
    <div>
      <div className="fila-botones">
        <a className="boton claro" href="/api/cuaderno/exportar?tipo=respaldo" onClick={vaciar}>Descargar respaldo ↧</a>
        <button type="button" className="boton claro" onClick={() => ref.current.click()}>Restaurar respaldo</button>
        <input ref={ref} type="file" accept="application/json,.json" hidden onChange={elegir} />
      </div>
      {archivo && (
        <div className="confirmar" role="alert">
          <p>Vas a reemplazar todo tu cuaderno con <b>{archivo.nombre}</b>. ¿Continuar?</p>
          <button type="button" className="boton oscuro" onClick={restaurar}>Sí, restaurar</button>
          <button type="button" className="boton claro" onClick={() => setArchivo(null)}>Cancelar</button>
        </div>
      )}
      {msg?.error && <p className="msg-error" role="alert">{msg.error}</p>}
      {msg?.ok && <p className="msg-ok" role="status">{msg.ok}</p>}
    </div>
  );
}

export default function Cuaderno() {
  const [v, setV] = useState(null);
  const recargar = () => cargar().then(setV);
  useEffect(() => {
    recargar();
    return () => { vaciar(); };
  }, []);

  if (!v) return <p className="ayuda">Cargando tu cuaderno…</p>;
  const lleno = (c) => (v[c.id] || '').trim();

  return (
    <>
      <div className="tarjeta no-imprimir">
        <div className="campo">
          <label htmlFor="nombre">Nombre de este cuaderno · opcional</label>
          <input id="nombre" type="text" maxLength={120} value={v[NOMBRE_CUADERNO] || ''} onChange={(e) => { setV({ ...v, [NOMBRE_CUADERNO]: e.target.value }); guardar(NOMBRE_CUADERNO, e.target.value); }} />
        </div>
        <h3>Exportar tu trabajo</h3>
        <p className="ayuda">Las respuestas del caso quedan listas para compartir con tu grupo. El cuaderno completo también incluye las reflexiones individuales.</p>
        <div className="fila-botones">
          <a className="boton oscuro" href="/api/cuaderno/exportar?tipo=caso" onClick={vaciar}>Descargar respuestas del caso ↧</a>
          <a className="boton claro" href="/api/cuaderno/exportar?tipo=completo" onClick={vaciar}>Descargar cuaderno completo ↧</a>
          <button type="button" className="boton claro" onClick={() => window.print()}>Imprimir / guardar PDF</button>
        </div>
        <p className="ayuda chico">Imprimir / guardar PDF incluye el cuaderno completo y las reflexiones individuales.</p>
      </div>

      {v[NOMBRE_CUADERNO] && <h2 className="solo-imprimir">{v[NOMBRE_CUADERNO]}</h2>}
      {FASES.map((f) => {
        const caso = f.bloques.flatMap((b) => b.campos);
        const cuentan = caso.filter((c) => !c.individual && !c.noCuenta);
        return (
          <section className="tarjeta repaso" key={f.n}>
            <div className="repaso-cabeza">
              <div><p className="ceja">FASE 0{f.n}</p><h2>{f.t}</h2></div>
              <span className="insignia">{cuentan.filter(lleno).length} / {cuentan.length} respuestas del caso</span>
            </div>
            {caso.map((c) => (
              <div className="repaso-item" key={c.id}>
                <p className="traer-t">{c.t}{c.individual ? <em> · individual</em> : ''}</p>
                <p className={lleno(c) || c.omision ? 'traer-v' : 'traer-v vacio'}>{lleno(c) || c.omision || 'Sin registrar todavía.'}</p>
              </div>
            ))}
            <Link className="enlace no-imprimir" href={`/fase/${f.n}`}>Editar esta fase →</Link>
          </section>
        );
      })}
      <section className="tarjeta repaso">
        <div className="repaso-cabeza"><div><p className="ceja">REFLEXIÓN INDIVIDUAL</p><h2>Mi próxima conversación con un cliente</h2></div></div>
        {FASES[3].cierreReflexion.campos.map((c) => (
          <div className="repaso-item" key={c.id}>
            <p className="traer-t">{c.t}</p>
            <p className={lleno(c) ? 'traer-v' : 'traer-v vacio'}>{lleno(c) || 'Sin registrar todavía.'}</p>
          </div>
        ))}
        <Link className="enlace no-imprimir" href="/fase/4">Editar esta reflexión →</Link>
      </section>
      <div className="no-imprimir">
        <Respaldo alRestaurar={recargar} />
        <p className="ayuda chico">Tu cuaderno se guarda en tu cuenta y lo encuentras desde cualquier dispositivo. Ni los demás participantes ni el administrador lo ven en la aplicación. Cada persona tiene su propio cuaderno, así que acuerden en el grupo cuál tendrá las respuestas finales. Un respaldo contiene el cuaderno completo, incluidas las reflexiones individuales.</p>
      </div>
    </>
  );
}
