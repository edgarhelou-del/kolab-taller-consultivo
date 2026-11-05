import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { protegido } from '@/lib/api';
import { FASES, NOMBRE_CUADERNO, camposDeFase } from '@/content/fases';

function descarga(cuerpo, nombre, tipo) {
  return new NextResponse(cuerpo, {
    headers: {
      'Content-Type': `${tipo}; charset=utf-8`,
      'Content-Disposition': `attachment; filename="${nombre}"`,
      'Cache-Control': 'no-store',
    },
  });
}

export const GET = protegido(async (req, u) => {
  const tipo = new URL(req.url).searchParams.get('tipo');
  const sql = await db();
  const filas = await sql`SELECT campo, valor FROM respuestas WHERE usuario_id = ${u.id}`;
  const v = Object.fromEntries(filas.map((f) => [f.campo, f.valor]));

  if (tipo === 'respaldo') {
    return descarga(JSON.stringify({ formato: 'kolab-cuaderno-1', creado: new Date().toISOString(), valores: v }, null, 2), 'kolab-respaldo-cuaderno.json', 'application/json');
  }

  const completo = tipo === 'completo';
  const l = [`KOLAB · Banco Horizonte`, completo ? 'Cuaderno completo' : 'Respuestas del caso', v[NOMBRE_CUADERNO] || u.nombre, ''];
  for (const f of FASES) {
    l.push(`FASE ${f.n}: ${f.t.toUpperCase()}`, '');
    for (const c of camposDeFase(f)) {
      if (c.individual && !completo) continue;
      l.push(c.t, v[c.id] || c.omision || 'Sin registrar', '');
    }
  }
  return descarga('﻿' + l.join('\r\n'), completo ? 'kolab-cuaderno-completo.txt' : 'kolab-respuestas-del-caso.txt', 'text/plain');
});
