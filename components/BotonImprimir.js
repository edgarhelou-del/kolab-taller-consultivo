'use client';
export default function BotonImprimir({ texto }) {
  return <button type="button" className="boton claro no-imprimir" onClick={() => window.print()}>{texto} ↧</button>;
}
