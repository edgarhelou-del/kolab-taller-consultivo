import Link from 'next/link';
import { exigirUsuario } from '@/lib/auth';
import Emblema from '@/components/Emblema';
import { FASES } from '@/content/fases';

export default async function Inicio() {
  const u = await exigirUsuario();
  return (
    <>
      <section className="hero">
        <div>
          <p className="ceja">BIZAGI / COMUNICACIÓN CONSULTIVA</p>
          <h1>Mejores conversaciones.<br /><em>Decisiones más claras.</em></h1>
          <p className="hero-texto">Hola, {u.nombre}. Esta es tu guía para la teoría, el caso del banco y el trabajo que vamos a construir juntos.</p>
          <div className="hero-acciones">
            <Link href="/fase/1" className="boton oro">Empezar la fase 1 →</Link>
            <Link href="/caso/resumen" className="enlace claro">Leer primero el caso ↗</Link>
          </div>
        </div>
        <div className="hero-emblema">
          <Emblema size={300} opacidad={0.6} className="emblema-grande" />
          <p>CUSTOMER FIRST<br />EDGAR Y JEAN CLAUDE HELOU</p>
        </div>
      </section>

      <div className="titulo-seccion">
        <h2>Un caso. Cuatro fases conectadas.</h2>
        <span>Lee la teoría → trabaja en el caso → revisa tu cuaderno</span>
      </div>
      <div className="fases-rejilla">
        {FASES.map((f) => (
          <Link key={f.n} href={`/fase/${f.n}`} className="fase-tarjeta">
            <span className="num">0{f.n}</span><span className="flecha">↗</span>
            <b>{f.t}</b><small>{f.producto}</small>
          </Link>
        ))}
      </div>

      <h2 className="subtitulo">Antes de empezar</h2>
      <div className="dos">
        <Link href="/caso/resumen" className="tarjeta enlace-tarjeta"><b>Conoce a Banco Horizonte</b><span>Caso + diagnóstico inicial · unos 15 minutos</span><em>↗</em></Link>
        <Link href="/teoria" className="tarjeta enlace-tarjeta"><b>Ten el marco a la mano</b><span>Consulta la teoría durante y después del taller</span><em>↗</em></Link>
      </div>

      <section className="bloque-oscuro">
        <div>
          <p className="ceja">CÓMO TRABAJAMOS JUNTOS</p>
          <h2>Un cuaderno.<br />Tu propio espacio.</h2>
        </div>
        <div>
          <p>Cada persona trabaja en las mismas hojas, en su propio cuaderno guardado en su cuenta. Acuerden en el grupo cuál tendrá las respuestas finales.</p>
          <Link href="/cuaderno" className="enlace claro">Abrir mi cuaderno ↗</Link>
        </div>
      </section>
      <p className="ayuda">Las cuatro fases están abiertas. Sigan el taller en grupo o vuelve a cualquier fase cuando la necesites. La teoría completa y el caso también están disponibles en Recursos.</p>
    </>
  );
}
