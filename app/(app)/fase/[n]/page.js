import Link from 'next/link';
import { notFound } from 'next/navigation';
import { exigirUsuario } from '@/lib/auth';
import { FASES } from '@/content/fases';
import Pasos from '@/components/Pasos';
import Hoja from '@/components/Hoja';

export default async function Fase({ params }) {
  await exigirUsuario();
  const { n } = await params;
  const fase = FASES.find((f) => String(f.n) === n);
  if (!fase) notFound();
  return (
    <>
      <Pasos actual={fase.n} />
      <div className="fase-cabeza">
        <div>
          <p className="ceja">BANCO HORIZONTE / FASE 0{fase.n}</p>
          <h1 className="titulo-pagina">{fase.t}</h1>
          <p className="entrada-pagina">{fase.resumen}</p>
          <ul className="fase-datos">
            <li>{fase.min} min de ejercicio y puesta en común</li>
            <li>Producto: {fase.producto.charAt(0).toLowerCase() + fase.producto.slice(1)}</li>
          </ul>
        </div>
        <span className="fase-numero" aria-hidden="true">0{fase.n}</span>
      </div>
      <div className="fila-enlaces">
        <Link href="/caso/resumen" className="enlace">Caso y diagnóstico ↗</Link>
        <Link href="/cuaderno" className="enlace">Revisar mi cuaderno →</Link>
      </div>
      <details className="instrucciones">
        <summary>Cómo hacer este ejercicio · {fase.min} minutos</summary>
        <ol>
          {fase.pasos.map(([m, t, d]) => (
            <li key={t}><span className="min">{m}</span><div><b>{t}</b><p>{d}</p></div></li>
          ))}
        </ol>
        <p className="aviso">{fase.aviso}</p>
      </details>
      <Hoja key={fase.n} fase={fase} />
    </>
  );
}
