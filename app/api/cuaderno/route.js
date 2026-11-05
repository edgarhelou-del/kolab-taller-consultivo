import { db } from '@/lib/db';
import { error, json, leerJson, protegido } from '@/lib/api';
import { CAMPOS_VALIDOS, MAX_CARACTERES } from '@/content/fases';

// Toda consulta se filtra por el id de la sesión: nadie puede leer ni escribir el cuaderno de otra persona.
export const GET = protegido(async (req, u) => {
  const sql = await db();
  const filas = await sql`SELECT campo, valor FROM respuestas WHERE usuario_id = ${u.id}`;
  return json({ valores: Object.fromEntries(filas.map((f) => [f.campo, f.valor])) });
});

function validar(cambios) {
  if (!cambios || typeof cambios !== 'object' || Array.isArray(cambios)) return 'Datos no válidos.';
  for (const [k, v] of Object.entries(cambios)) {
    if (!CAMPOS_VALIDOS.has(k)) return 'Campo no válido.';
    if (typeof v !== 'string' || v.length > MAX_CARACTERES) return 'El texto es demasiado largo.';
  }
  return null;
}

async function aplicar(tx, id, cambios) {
  for (const [campo, valor] of Object.entries(cambios)) {
    if (valor === '') await tx`DELETE FROM respuestas WHERE usuario_id = ${id} AND campo = ${campo}`;
    else await tx`
      INSERT INTO respuestas (usuario_id, campo, valor) VALUES (${id}, ${campo}, ${valor})
      ON CONFLICT (usuario_id, campo) DO UPDATE SET valor = EXCLUDED.valor, actualizado_en = now()`;
  }
}

export const PUT = protegido(async (req, u) => {
  const b = await leerJson(req);
  const problema = validar(b?.cambios);
  if (problema) return error(problema);
  const sql = await db();
  await sql.begin((tx) => aplicar(tx, u.id, b.cambios));
  return json({ ok: true });
});

// Restaurar un respaldo: reemplaza el cuaderno de quien tiene la sesión abierta.
export const POST = protegido(async (req, u) => {
  const b = await leerJson(req);
  if (b?.formato !== 'kolab-cuaderno-1') return error('Este archivo no es un respaldo válido.');
  const problema = validar(b.valores);
  if (problema) return error('El respaldo contiene datos no válidos.');
  const sql = await db();
  await sql.begin(async (tx) => {
    await tx`DELETE FROM respuestas WHERE usuario_id = ${u.id}`;
    await aplicar(tx, u.id, b.valores);
  });
  return json({ ok: true });
});
