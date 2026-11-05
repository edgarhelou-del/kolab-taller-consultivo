import { redirect } from 'next/navigation';
import { usuarioActual } from '@/lib/auth';
import Emblema from '@/components/Emblema';
import FormularioClave from '@/components/FormularioClave';

export const metadata = { title: 'Crea tu clave | KOLAB' };

export default async function CambiarClave() {
  const u = await usuarioActual();
  if (!u) redirect('/ingresar');
  if (!u.debe_cambiar_clave) redirect('/');
  return (
    <div className="acceso">
      <div className="acceso-marca">
        <Emblema size={72} />
        <p className="acceso-kolab">KOLAB</p>
        <h1>Hola, {u.nombre}.<br /><em>Crea tu clave.</em></h1>
      </div>
      <div className="acceso-tarjeta">
        <h2>Cambia tu clave temporal</h2>
        <p className="ayuda">Antes de entrar, reemplaza la clave que te asignaron por una que solo tú conozcas.</p>
        <FormularioClave obligatorio />
      </div>
    </div>
  );
}
