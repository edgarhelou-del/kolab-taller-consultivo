import { db } from '@/lib/db';
import { claveTemporal, hashClave, normalizarUsuario, usuarioValido, validarClave } from '@/lib/auth';
import { error, json, leerJson, protegido } from '@/lib/api';

export const POST = protegido(async (req) => {
  const b = await leerJson(req);
  const usuario = normalizarUsuario(b?.usuario);
  const nombre = String(b?.nombre ?? '').trim();
  const rol = b?.rol === 'admin' ? 'admin' : 'participante';
  if (!nombre || nombre.length > 120) return error('Escribe el nombre de la persona.');
  if (!usuarioValido(usuario)) return error('El usuario debe tener de 3 a 60 caracteres: letras, números, punto, guion o @.');
  const clave = b?.clave ? String(b.clave) : claveTemporal();
  const problema = validarClave(clave);
  if (problema) return error(problema);
  const sql = await db();
  const [u] = await sql`
    INSERT INTO usuarios (usuario, nombre, clave_hash, rol, debe_cambiar_clave)
    VALUES (${usuario}, ${nombre}, ${await hashClave(clave)}, ${rol}, TRUE)
    ON CONFLICT (usuario) DO NOTHING RETURNING id`;
  if (!u) return error('Ese usuario ya existe.', 409);
  return json({ ok: true, usuario, clave }, 201);
}, { admin: true });
