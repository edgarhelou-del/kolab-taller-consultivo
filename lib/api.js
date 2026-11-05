import { NextResponse } from 'next/server';
import { usuarioActual } from './auth';

export const json = (data, status = 200) =>
  NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
export const error = (mensaje, status = 400) => json({ error: mensaje }, status);

// Protección contra CSRF: toda escritura debe venir de este mismo sitio.
export function mismoOrigen(req) {
  const origen = req.headers.get('origin');
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  if (!origen || !host) return false;
  try {
    return new URL(origen).host === host;
  } catch {
    return false;
  }
}

export async function leerJson(req) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

export function ipDe(req) {
  return (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';
}

// Envuelve un handler: origen, sesión, clave ya cambiada y (opcional) rol de administrador.
export function protegido(handler, { admin = false, permitirCambio = false } = {}) {
  return async (req, ctx) => {
    if (req.method !== 'GET' && !mismoOrigen(req)) return error('Origen no permitido.', 403);
    const u = await usuarioActual();
    if (!u) return error('Tu sesión terminó. Vuelve a ingresar.', 401);
    if (u.debe_cambiar_clave && !permitirCambio) return error('Debes cambiar tu clave.', 403);
    if (admin && u.rol !== 'admin') return error('No autorizado.', 403);
    return handler(req, u, ctx);
  };
}
