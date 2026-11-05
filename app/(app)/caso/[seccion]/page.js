import Link from 'next/link';
import { notFound } from 'next/navigation';
import { exigirUsuario } from '@/lib/auth';
import { CasoDiagnostico, CasoResumen } from '@/content/Caso';
import Pasos from '@/components/Pasos';
import BotonImprimir from '@/components/BotonImprimir';

export default async function Caso({ params }) {
  await exigirUsuario();
  const { seccion } = await params;
  if (seccion !== 'resumen' && seccion !== 'diagnostico') notFound();
  const esResumen = seccion === 'resumen';
  return (
    <>
      <Pasos />
      <p className="ceja">TALLER DEL CASO / PREPARACIÓN OBLIGATORIA</p>
      <div className="fila-titulo">
        <div>
          <h1 className="titulo-pagina">Banco Horizonte</h1>
          <p className="entrada-pagina">Apertura de cuentas para pequeñas empresas.</p>
        </div>
        <BotonImprimir texto="Imprimir el caso" />
      </div>
      <div className="pestanas no-imprimir">
        <Link href="/caso/resumen" className={esResumen ? 'activa' : ''}>Resumen del caso</Link>
        <Link href="/caso/diagnostico" className={!esResumen ? 'activa' : ''}>Diagnóstico de consultoría</Link>
      </div>
      <div className="tarjeta">{esResumen ? <CasoResumen /> : <CasoDiagnostico />}</div>
      <aside className="recuadro">
        <b>Ten presente</b>
        <p>El diagnóstico está terminado. Las cuatro fases ocurren en el punto de decisión de hoy.</p>
        <p>La implementación no ha comenzado. Seis semanas es el plazo para la propuesta de financiación completa.</p>
      </aside>
      <div className="acciones-hoja no-imprimir">
        <Link href="/fase/1" className="boton oscuro">Ir a la fase 1 →</Link>
        {esResumen && <Link href="/caso/diagnostico" className="enlace">Leer el diagnóstico →</Link>}
      </div>
    </>
  );
}
