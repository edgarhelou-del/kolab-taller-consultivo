import { exigirAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import AdminUsuarios from '@/components/AdminUsuarios';

export default async function Usuarios() {
  const yo = await exigirAdmin();
  const sql = await db();
  const filas = await sql`SELECT id, usuario, nombre, rol, activo, debe_cambiar_clave, ultimo_ingreso FROM usuarios ORDER BY rol, nombre`;
  const usuarios = filas.map((u) => ({ ...u, id: String(u.id), ultimo_ingreso: u.ultimo_ingreso?.toISOString() ?? null }));
  return (
    <>
      <p className="ceja">ADMINISTRACIÓN</p>
      <h1 className="titulo-pagina">Usuarios</h1>
      <p className="entrada-pagina">Crea las cuentas de los participantes, asígnales usuario y clave, y controla quién tiene acceso.</p>
      <AdminUsuarios usuarios={usuarios} yoId={String(yo.id)} />
    </>
  );
}
