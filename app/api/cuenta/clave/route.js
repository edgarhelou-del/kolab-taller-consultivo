import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { crearSesion, hashClave, validarClave } from '@/lib/auth';
import { error, json, leerJson, protegido } from '@/lib/api';

export const POST = protegido(async (req, u) => {
  const b = await leerJson(req);
  const sql = await db();
  const [fila] = await sql`SELECT clave_hash FROM usuarios WHERE id = ${u.id}`;
  if (!b?.actual || !(await bcrypt.compare(String(b.actual), fila.clave_hash))) return error('Tu clave actual no es correcta.');
  const problema = validarClave(b.nueva);
  if (problema) return error(problema);
  if (b.nueva === b.actual) return error('La clave nueva debe ser distinta de la actual.');
  await sql`UPDATE usuarios SET clave_hash = ${await hashClave(b.nueva)}, debe_cambiar_clave = FALSE WHERE id = ${u.id}`;
  await sql`DELETE FROM sesiones WHERE usuario_id = ${u.id}`;
  await crearSesion(u.id);
  return json({ ok: true });
}, { permitirCambio: true });
