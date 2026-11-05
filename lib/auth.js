import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from './db';

const COOKIE = 'kolab_sesion';
const DIAS_SESION = 14;
const MAX_FALLOS = 5;
const MINUTOS_BLOQUEO = 15;
export const MIN_CLAVE = 10;

const sha = (t) => createHash('sha256').update(t).digest('hex');
export const normalizarUsuario = (u) => String(u ?? '').trim().toLowerCase();
export const usuarioValido = (u) => /^[a-z0-9._@-]{3,60}$/.test(u);
export const hashClave = (c) => bcrypt.hash(c, 11);
const HASH_FALSO = bcrypt.hashSync('kolab-sin-usuario', 11);

function iguales(a, b) {
  const x = createHash('sha256').update(String(a)).digest();
  const y = createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(x, y);
}

export function validarClave(c) {
  if (typeof c !== 'string' || c.length < MIN_CLAVE) return `La clave debe tener al menos ${MIN_CLAVE} caracteres.`;
  if (c.length > 72) return 'La clave no puede tener más de 72 caracteres.';
  return null;
}

export async function crearSesion(usuarioId) {
  const sql = await db();
  const token = randomBytes(32).toString('base64url');
  const expira = new Date(Date.now() + DIAS_SESION * 864e5);
  await sql`DELETE FROM sesiones WHERE expira_en < now()`;
  await sql`INSERT INTO sesiones (token_hash, usuario_id, expira_en) VALUES (${sha(token)}, ${usuarioId}, ${expira})`;
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expira,
  });
}

export async function cerrarSesion() {
  const jar = await cookies();
  const t = jar.get(COOKIE)?.value;
  if (t) {
    const sql = await db();
    await sql`DELETE FROM sesiones WHERE token_hash = ${sha(t)}`;
  }
  jar.delete(COOKIE);
}

export async function usuarioActual() {
  const t = (await cookies()).get(COOKIE)?.value;
  if (!t) return null;
  const sql = await db();
  const [u] = await sql`
    SELECT u.id, u.usuario, u.nombre, u.rol, u.debe_cambiar_clave
    FROM sesiones s JOIN usuarios u ON u.id = s.usuario_id
    WHERE s.token_hash = ${sha(t)} AND s.expira_en > now() AND u.activo`;
  return u ?? null;
}

// Para páginas
export async function exigirUsuario() {
  const u = await usuarioActual();
  if (!u) redirect('/ingresar');
  if (u.debe_cambiar_clave) redirect('/cambiar-clave');
  return u;
}
export async function exigirAdmin() {
  const u = await exigirUsuario();
  if (u.rol !== 'admin') redirect('/');
  return u;
}

// Administrador inicial, definido con variables de entorno.
// Funciona si no hay ningún administrador activo, o si ADMIN_RESTABLECER=si (recuperación).
async function intentarAdminInicial(sql, usuario, clave) {
  const envUsuario = normalizarUsuario(process.env.ADMIN_USUARIO);
  const envClave = process.env.ADMIN_CLAVE;
  if (!envUsuario || !envClave || envClave.length < MIN_CLAVE) return null;
  if (usuario !== envUsuario || !iguales(clave, envClave)) return null;
  const restablecer = process.env.ADMIN_RESTABLECER === 'si';
  if (!restablecer) {
    const [{ n }] = await sql`SELECT count(*)::int AS n FROM usuarios WHERE rol = 'admin' AND activo`;
    if (n > 0) return null;
  }
  const hash = await hashClave(clave);
  const [u] = await sql`
    INSERT INTO usuarios (usuario, nombre, clave_hash, rol, activo, debe_cambiar_clave)
    VALUES (${usuario}, ${usuario.charAt(0).toUpperCase() + usuario.slice(1)}, ${hash}, 'admin', TRUE, TRUE)
    ON CONFLICT (usuario) DO UPDATE
      SET clave_hash = EXCLUDED.clave_hash, rol = 'admin', activo = TRUE, debe_cambiar_clave = TRUE
    RETURNING id`;
  return u;
}

export async function ingresar(usuarioBruto, clave, ip) {
  const sql = await db();
  const usuario = normalizarUsuario(usuarioBruto);
  if (!usuario || typeof clave !== 'string' || !clave || clave.length > 200) return { error: 'Usuario o clave incorrectos.' };
  const clavePar = sha(`${usuario}|${ip}`);
  const [intento] = await sql`SELECT fallos, bloqueado_hasta FROM intentos_ingreso WHERE clave = ${clavePar}`;
  if (intento?.bloqueado_hasta && new Date(intento.bloqueado_hasta) > new Date()) {
    return { error: `Demasiados intentos. Vuelve a intentarlo en ${MINUTOS_BLOQUEO} minutos.`, estado: 429 };
  }

  let id = null;
  const inicial = await intentarAdminInicial(sql, usuario, clave);
  if (inicial) id = inicial.id;
  else {
    const [u] = await sql`SELECT id, clave_hash, activo FROM usuarios WHERE usuario = ${usuario}`;
    const ok = await bcrypt.compare(clave, u?.clave_hash ?? HASH_FALSO);
    if (u && ok && u.activo) id = u.id;
  }

  if (!id) {
    const fallos = (intento?.fallos ?? 0) + 1;
    const bloqueo = fallos >= MAX_FALLOS ? new Date(Date.now() + MINUTOS_BLOQUEO * 6e4) : null;
    await sql`
      INSERT INTO intentos_ingreso (clave, fallos, bloqueado_hasta) VALUES (${clavePar}, ${bloqueo ? 0 : fallos}, ${bloqueo})
      ON CONFLICT (clave) DO UPDATE SET fallos = ${bloqueo ? 0 : fallos}, bloqueado_hasta = ${bloqueo}, actualizado_en = now()`;
    return { error: 'Usuario o clave incorrectos.', estado: 401 };
  }
  await sql`DELETE FROM intentos_ingreso WHERE clave = ${clavePar} OR actualizado_en < now() - interval '1 day'`;
  await sql`UPDATE usuarios SET ultimo_ingreso = now() WHERE id = ${id}`;
  await crearSesion(id);
  return { ok: true };
}

export function claveTemporal() {
  const letras = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const b = randomBytes(12);
  return Array.from(b, (x) => letras[x % letras.length]).join('');
}
