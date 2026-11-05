'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Emblema from './Emblema';
import { CasoDiagnostico, CasoResumen } from '@/content/Caso';
import { vaciar } from '@/lib/cuadernoCliente';

const I = {
  inicio: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  teoria: 'M12 6c-2-1.5-5-2-8-2v15c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zm0 0v15',
  caso: 'M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h7',
  cuaderno: 'M5 3h14v18H5zM9 8h6M9 12h6M9 16h4',
  recursos: 'M12 3v12m-5-5l5 5 5-5M4 20h16',
  admin: 'M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0zM4 21c1-4 4-6 8-6s7 2 8 6',
};
const Icono = ({ d }) => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true"><path d={d} /></svg>
);

function titulo(path) {
  if (path.startsWith('/teoria')) return 'Teoría y referencia';
  if (path.startsWith('/caso')) return 'Taller del caso / Banco Horizonte';
  if (path.startsWith('/fase/')) return `Taller del caso / Fase 0${path.split('/')[2]}`;
  if (path.startsWith('/cuaderno')) return 'Mi cuaderno';
  if (path.startsWith('/recursos')) return 'Recursos';
  if (path.startsWith('/admin')) return 'Administración de usuarios';
  if (path.startsWith('/cuenta')) return 'Mi cuenta';
  return 'Tu taller';
}

export default function Marco({ usuario, children }) {
  const path = usePathname();
  const [panel, setPanel] = useState(false);
  const [pestana, setPestana] = useState('resumen');
  const [estado, setEstado] = useState('guardado');

  useEffect(() => {
    const f = (e) => setEstado(e.detail);
    window.addEventListener('kolab-guardado', f);
    return () => window.removeEventListener('kolab-guardado', f);
  }, []);
  useEffect(() => {
    document.title = `${titulo(path)} | KOLAB`;
    window.scrollTo(0, 0);
  }, [path]);

  const items = [
    ['/', 'Inicio del taller', I.inicio, (p) => p === '/'],
    ['/teoria', 'Teoría y referencia', I.teoria, (p) => p.startsWith('/teoria')],
    ['/caso/resumen', 'Taller del caso', I.caso, (p) => p.startsWith('/caso') || p.startsWith('/fase')],
    ['/cuaderno', 'Mi cuaderno', I.cuaderno, (p) => p.startsWith('/cuaderno')],
    ['/recursos', 'Recursos', I.recursos, (p) => p.startsWith('/recursos')],
  ];
  if (usuario.rol === 'admin') items.push(['/admin/usuarios', 'Usuarios', I.admin, (p) => p.startsWith('/admin')]);

  async function salir() {
    await vaciar();
    await fetch('/api/auth/salir', { method: 'POST' });
    window.location.assign('/ingresar');
  }

  const textoEstado = { guardado: 'Guardado en tu cuenta', guardando: 'Guardando…', error: 'Sin conexión, reintentando…' }[estado];

  return (
    <div className="marco">
      <a className="saltar" href="#principal">Ir al contenido</a>
      <aside className="lateral">
        <Link href="/" className="marca">
          <Emblema size={44} />
          <span><b>KOLAB</b><small>GUÍA DEL TALLER</small></span>
        </Link>
        <p className="lateral-cliente">BIZAGI · CUSTOMER FIRST</p>
        <nav aria-label="Navegación principal">
          {items.map(([href, t, d, activo]) => (
            <Link key={href} href={href} className={activo(path) ? 'activo' : ''} aria-current={activo(path) ? 'page' : undefined}>
              <Icono d={d} /> <span>{t}</span>
            </Link>
          ))}
        </nav>
        <div className="lateral-pie">
          <p className="edicion">EDICIÓN DEL TALLER 04</p>
          <p className="lema">Una conversación.<br />Cuatro fases conectadas.</p>
          <p className={`estado estado-${estado}`} role="status"><i /> {textoEstado}</p>
          <div className="quien">
            <Link href="/cuenta" title="Mi cuenta">{usuario.nombre}</Link>
            <button type="button" onClick={salir}>Salir</button>
          </div>
        </div>
      </aside>

      <div className="columna">
        <header className="superior">
          <span>{titulo(path)}</span>
          <button type="button" className="abrir-caso" onClick={() => setPanel(true)}>Abrir el caso <em>↗</em></button>
        </header>
        <main id="principal" className="principal">{children}</main>
        <footer className="pie"><span>KOLAB / COMUNICACIÓN CONSULTIVA</span><span>Contenido v7 · Taller de cuatro fases</span></footer>
      </div>

      {panel && <div className="velo" onClick={() => setPanel(false)} />}
      <aside className={`panel-caso ${panel ? 'abierto' : ''}`} aria-hidden={!panel} aria-label="Referencia del caso">
        <div className="panel-cabeza">
          <div><p className="ceja">TU REFERENCIA</p><h2>Banco Horizonte</h2></div>
          <button type="button" onClick={() => setPanel(false)} aria-label="Cerrar el caso">✕</button>
        </div>
        <div className="pestanas">
          <button type="button" className={pestana === 'resumen' ? 'activa' : ''} onClick={() => setPestana('resumen')}>Resumen del caso</button>
          <button type="button" className={pestana === 'diagnostico' ? 'activa' : ''} onClick={() => setPestana('diagnostico')}>Diagnóstico</button>
        </div>
        <div className="panel-cuerpo">{panel && (pestana === 'resumen' ? <CasoResumen /> : <CasoDiagnostico />)}</div>
      </aside>
    </div>
  );
}
