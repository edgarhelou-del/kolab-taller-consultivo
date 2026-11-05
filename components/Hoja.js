'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cargar, guardar, vaciar } from '@/lib/cuadernoCliente';

const contar = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);

function Campo({ c, valor, cambiar }) {
  if (c.tipo === 'opciones') {
    const v = valor || c.omision;
    return (
      <fieldset className="campo">
        <legend>{c.t}</legend>
        <p className="ayuda">{c.ayuda}</p>
        <div className="opciones">
          {c.opciones.map((o) => (
            <label key={o} className={v === o ? 'marcada' : ''}>
              <input type="radio" name={c.id} checked={v === o} onChange={() => cambiar(c.id, o)} /> {o}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }
  const n = c.palabras ? contar(valor || '') : 0;
  return (
    <div className="campo">
      <label htmlFor={c.id}>{c.t}</label>
      <p className="ayuda">{c.ayuda}</p>
      <textarea id={c.id} rows={c.filas || 4} maxLength={20000} value={valor || ''} onChange={(e) => cambiar(c.id, e.target.value)} onBlur={vaciar} />
      {c.palabras && <p className={`contador ${n > c.palabras ? 'excede' : ''}`}>{n} / {c.palabras} palabras · Apunta a un minuto.</p>}
    </div>
  );
}

function Traer({ items, v, editar }) {
  return (
    <div className="traer-lista">
      {items.map(([id, t]) => (
        <div key={id}>
          <p className="traer-t">{t}</p>
          <p className={v[id] ? 'traer-v' : 'traer-v vacio'}>{v[id] || 'Sin registrar todavía.'}</p>
        </div>
      ))}
      {editar && <Link href={editar} className="enlace">Editar la hoja anterior →</Link>}
    </div>
  );
}

export default function Hoja({ fase }) {
  const [v, setV] = useState(null);
  const [falla, setFalla] = useState(false);

  useEffect(() => {
    let vivo = true;
    cargar().then((d) => vivo && setV(d)).catch(() => vivo && setFalla(true));
    return () => {
      vivo = false;
      vaciar();
    };
  }, []);

  function cambiar(id, valor) {
    setV((x) => ({ ...x, [id]: valor }));
    guardar(id, valor);
  }

  const n = fase.n;
  return (
    <>
      {fase.traer.length > 0 && (
        <section className="tarjeta traer">
          <h2>Traer el trabajo anterior</h2>
          <p className="ayuda">Estas son las respuestas guardadas en tu cuenta. Puedes abrir cualquier fase en cualquier momento.</p>
          {v ? <Traer items={fase.traer} v={v} editar={`/fase/${n - 1}`} /> : <p className="ayuda">Cargando…</p>}
        </section>
      )}
      <div className="referencias">
        <span>¿Necesitas una referencia?</span>
        {fase.refs.map(([t, id]) => <Link key={id} href={`/teoria?e=${id}`}>{t} ↗</Link>)}
      </div>
      <div className="hoja-cabeza">
        <h2>Tu hoja de trabajo</h2>
        <p>Se guarda sola en tu cuenta. Solo tú la ves.</p>
      </div>
      {falla && <p className="msg-error" role="alert">No pudimos cargar tus respuestas. Recarga la página.</p>}
      {!v && !falla && <p className="ayuda">Cargando tus respuestas…</p>}
      {v && (
        <>
          {fase.bloques.map((b, i) => (
            <section key={i} className={`tarjeta ${b.destacado ? 'destacada' : ''}`}>
              {b.eyebrow && <p className="ceja">{b.eyebrow.toUpperCase()}</p>}
              {b.t && <h3>{b.t}</h3>}
              {b.ayuda && <p className="ayuda">{b.ayuda}</p>}
              {b.campos.map((c) => <Campo key={c.id} c={c} valor={v[c.id]} cambiar={cambiar} />)}
            </section>
          ))}
          {fase.cierreReflexion && (
            <section className="tarjeta reflexion">
              <p className="ceja">{fase.cierreReflexion.eyebrow.toUpperCase()}</p>
              <h3>{fase.cierreReflexion.t}</h3>
              <p className="ayuda">{fase.cierreReflexion.ayuda}</p>
              <Traer items={fase.cierreReflexion.traer} v={v} />
              {fase.cierreReflexion.campos.map((c) => <Campo key={c.id} c={c} valor={v[c.id]} cambiar={cambiar} />)}
            </section>
          )}
        </>
      )}
      <div className="acciones-hoja">
        {n < 4 && <Link className="boton oscuro" href={`/fase/${n + 1}`}>Continuar a la fase {n + 1} →</Link>}
        <Link className="enlace" href="/cuaderno">Revisar mi cuaderno →</Link>
        <a className="enlace" href="/api/cuaderno/exportar?tipo=respaldo">Descargar respaldo</a>
      </div>
      {fase.cierre && <p className="aviso-pausa">{fase.cierre}</p>}
    </>
  );
}
