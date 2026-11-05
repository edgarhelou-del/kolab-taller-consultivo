'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { GRUPOS, TEORIA } from '@/content/teoria';

const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const textoDe = (e) => norm([e.t, e.lead, e.nota, e.destacado, e.fuente, ...(e.texto || []), ...(e.pares || []).flat(), ...(e.tabla ? [...e.tabla.cols, ...e.tabla.filas.flat()] : [])].filter(Boolean).join(' '));
const largo = (g) => GRUPOS.find((x) => x.id === g).largo;

function Entrada({ e, abierta }) {
  return (
    <details id={e.id} className="entrada" open={abierta}>
      <summary>
        <span><b>{e.t}</b><small>{largo(e.g)} · Diapositiva {e.s} de la teoría</small></span>
      </summary>
      <article className="entrada-cuerpo">
        <h3>{e.t}</h3>
        <p className="lead">{e.lead}</p>
        {e.destacado && <h4 className="destacado">{e.destacado}</h4>}
        {e.texto?.map((t, i) => <p key={i}>{t}</p>)}
        {e.pares && (
          <div className="pares">
            {e.pares.map(([a, b]) => <div key={a}><b>{a}</b><span>{b}</span></div>)}
          </div>
        )}
        {e.tabla && (
          <div className="tabla-envoltura"><table>
            <thead><tr>{e.tabla.cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
            <tbody>{e.tabla.filas.map((f, i) => <tr key={i}>{f.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
          </table></div>
        )}
        <p className="nota">{e.nota}</p>
        {e.fuente && <p className="fuente">{e.fuente}</p>}
      </article>
    </details>
  );
}

export default function Teoria() {
  const objetivo = useSearchParams().get('e');
  const [q, setQ] = useState('');
  const [g, setG] = useState('todas');
  const indice = useMemo(() => TEORIA.map((e) => [e, textoDe(e)]), []);
  const lista = indice.filter(([e, t]) => (g === 'todas' || e.g === g) && t.includes(norm(q.trim()))).map(([e]) => e);

  useEffect(() => {
    if (objetivo) document.getElementById(objetivo)?.scrollIntoView({ block: 'start' });
  }, [objetivo]);

  return (
    <>
      <div className="filtros no-imprimir">
        <input type="search" aria-label="Buscar en la teoría" placeholder="Busca conceptos, ejemplos o una pregunta…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="chips" role="group" aria-label="Filtrar el material de referencia">
          {GRUPOS.map((x) => <button type="button" key={x.id} className={g === x.id ? 'activo' : ''} aria-pressed={g === x.id} onClick={() => setG(x.id)}>{x.t}</button>)}
        </div>
        <p className="conteo" role="status">{lista.length} {lista.length === 1 ? 'entrada' : 'entradas'} de referencia</p>
      </div>
      {lista.map((e) => <Entrada key={e.id} e={e} abierta={e.id === objetivo || e.id === 'punto-de-vista' || !!q.trim()} />)}
      {!lista.length && <p className="ayuda">No encontramos nada con esa búsqueda. Prueba con otra palabra.</p>}
    </>
  );
}
