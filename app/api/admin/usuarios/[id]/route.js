import { db } from '@/lib/db';
import { claveTemporal, hashClave, validarClave } from '@/lib/auth';
import { error, json, leerJson, protegido } from '@/lib/api';

async function hayOtroAdmin(sql, id) {
  const [{ n }] = await sql`SELECT count(*)::int AS n FROM usuarios WHERE rol = 'admin' AND activo AND id <> ${id}`;
  return n > 0;
}

async function idDe(ctx) {
  const { id } = await ctx.params;
  return /^\d{1,18}$/.test(id) ? id : null;
}

export const PATCH = protegido(async (req, yo, ctx) => {
  const id = await idDe(ctx);
  if (!id) return error('Usuario no encontrado.', 404);
  const b = await leerJson(req);
  const sql = await db();
  const [u] = await sql`SELECT id, rol, activo FROM usuarios WHERE id = ${id}`;
  if (!u) return error('Usuario no encontrado.', 404);

  if (b?.accion === 'clave') {
    const clave = b.clave ? String(b.clave) : claveTemporal();
    const problema = validarClave(clave);
    if (problema) return error(problema);
    await sql`UPDATE usuarios SET clave_hash = ${await hashClave(clave)}, debe_cambiar_clave = TRUE WHERE id = ${id}`;
    await sql`DELETE FROM sesiones WHERE usuario_id = ${id}`;
    return json({ ok: true, clave });
  }
  if (b?.accion === 'activo') {
    const activo = !!b.valor;
    if (!activo && u.rol === 'admin' && !(await hayOtroAdmin(sql, id))) return error('Debe quedar al menos un administrador activo.');
    await sql`UPDATE usuarios SET activo = ${activo} WHERE id = ${id}`;
    if (!activo) await sql`DELETE FROM sesiones WHERE usuario_id = ${id}`;
    return json({ ok: true });
  }
  if (b?.accion === 'rol') {
    const rol = b.valor === 'admin' ? 'admin' : 'participante';
    if (rol !== 'admin' && u.rol === 'admin' && !(await hayOtroAdmin(sql, id))) return error('Debe quedar al menos un administrador activo.');
    await sql`UPDATE usuarios SET rol = ${rol} WHERE id = ${id}`;
    return json({ ok: true });
  }
  return error('Acción no válida.');
}, { admin: true });

export const DELETE = protegido(async (req, yo, ctx) => {
  const id = await idDe(ctx);
  if (!id) return error('Usuario no encontrado.', 404);
  if (String(yo.id) === id) return error('No puedes eliminar tu propia cuenta.');
  const sql = await db();
  const [u] = await sql`SELECT rol FROM usuarios WHERE id = ${id}`;
  if (!u) return error('Usuario no encontrado.', 404);
  if (u.rol === 'admin' && !(await hayOtroAdmin(sql, id))) return error('Debe quedar al menos un administrador activo.');
  await sql`DELETE FROM usuarios WHERE id = ${id}`;
  return json({ ok: true });
}, { admin: true });
