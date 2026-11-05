import { cerrarSesion } from '@/lib/auth';
import { error, json, mismoOrigen } from '@/lib/api';

export async function POST(req) {
  if (!mismoOrigen(req)) return error('Origen no permitido.', 403);
  await cerrarSesion();
  return json({ ok: true });
}
