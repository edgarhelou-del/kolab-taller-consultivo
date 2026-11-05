import { exigirUsuario } from '@/lib/auth';
import FormularioClave from '@/components/FormularioClave';

export default async function Cuenta() {
  const u = await exigirUsuario();
  return (
    <>
      <p className="ceja">MI CUENTA</p>
      <h1 className="titulo-pagina">{u.nombre}</h1>
      <p className="entrada-pagina">Tu usuario es <code>{u.usuario}</code>.</p>
      <section className="tarjeta angosta">
        <h2>Cambiar mi clave</h2>
        <FormularioClave />
      </section>
    </>
  );
}
