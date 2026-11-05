import Link from 'next/link';
import { FASES } from '@/content/fases';

export default function Pasos({ actual }) {
  return (
    <nav className="pasos no-imprimir" aria-label="Fases del taller">
      {FASES.map((f) => (
        <Link key={f.n} href={`/fase/${f.n}`} className={actual === f.n ? 'activo' : ''} aria-current={actual === f.n ? 'step' : undefined}>
          <span>0{f.n}</span> {f.t}
        </Link>
      ))}
    </nav>
  );
}
