import Link from 'next/link';
import { Suspense } from 'react';
import { exigirUsuario } from '@/lib/auth';
import Teoria from '@/components/Teoria';

export default async function PaginaTeoria() {
  await exigirUsuario();
  return (
    <>
      <p className="ceja">TEORÍA Y REFERENCIA</p>
      <h1 className="titulo-pagina">Un marco al cual volver.</h1>
      <p className="entrada-pagina">Los marcos, las explicaciones y los ejemplos de las cuatro fases. Úsalos durante la presentación o vuelve a ellos cuando necesites una referencia.</p>
      <p className="no-imprimir"><Link href="/caso/resumen" className="enlace">Volver al taller del caso →</Link></p>
      <Suspense><Teoria /></Suspense>
    </>
  );
}
