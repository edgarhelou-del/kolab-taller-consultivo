import { redirect } from 'next/navigation';
import { usuarioActual } from '@/lib/auth';
import Emblema from '@/components/Emblema';
import FormularioIngreso from './FormularioIngreso';

export const metadata = { title: 'Ingresar | KOLAB' };

export default async function Ingresar() {
  if (await usuarioActual()) redirect('/');
  return (
    <div className="acceso">
      <div className="acceso-marca">
        <Emblema size={72} />
        <p className="acceso-kolab">KOLAB</p>
        <p className="ceja">GUÍA DEL TALLER · BIZAGI</p>
        <h1>Mejores conversaciones.<br /><em>Decisiones más claras.</em></h1>
      </div>
      <div className="acceso-tarjeta">
        <h2>Ingresa a tu espacio</h2>
        <p className="ayuda">Usa el usuario y la clave que te entregó el administrador del taller.</p>
        <FormularioIngreso />
      </div>
    </div>
  );
}
