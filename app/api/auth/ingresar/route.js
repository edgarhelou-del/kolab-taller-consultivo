import { ingresar } from '@/lib/auth';
import { error, ipDe, json, leerJson, mismoOrigen } from '@/lib/api';

export async function POST(req) {
  if (!mismoOrigen(req)) return error('Origen no permitido.', 403);
  const b = await leerJson(req);
  const r = await ingresar(b?.usuario, b?.clave, ipDe(req));
  if (r.error) return error(r.error, r.estado ?? 401);
  return json({ ok: true });
}
