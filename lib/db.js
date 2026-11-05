import postgres from 'postgres';

const ESQUEMA = `
CREATE TABLE IF NOT EXISTS usuarios (
  id BIGSERIAL PRIMARY KEY,
  usuario TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  clave_hash TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'participante' CHECK (rol IN ('admin','participante')),
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  debe_cambiar_clave BOOLEAN NOT NULL DEFAULT TRUE,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
  ultimo_ingreso TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS sesiones (
  token_hash TEXT PRIMARY KEY,
  usuario_id BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  expira_en TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS sesiones_usuario ON sesiones(usuario_id);
CREATE TABLE IF NOT EXISTS respuestas (
  usuario_id BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  campo TEXT NOT NULL,
  valor TEXT NOT NULL,
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (usuario_id, campo)
);
CREATE TABLE IF NOT EXISTS intentos_ingreso (
  clave TEXT PRIMARY KEY,
  fallos INT NOT NULL DEFAULT 0,
  bloqueado_hasta TIMESTAMPTZ,
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT now()
);`;

const g = globalThis;

function conexion() {
  if (g.__kolabSql) return g.__kolabSql;
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error('Falta configurar DATABASE_URL.');
  const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
  g.__kolabSql = postgres(url, {
    max: 3,
    idle_timeout: 20,
    connect_timeout: 15,
    prepare: false, // compatible con conexiones con pooling (Neon, Supabase)
    ssl: local ? false : 'require',
    onnotice: () => {},
  });
  return g.__kolabSql;
}

// Devuelve la conexión y crea las tablas la primera vez, sin pasos manuales.
export async function db() {
  const sql = conexion();
  if (!g.__kolabEsquema) {
    g.__kolabEsquema = sql
      .begin(async (tx) => {
        await tx`SELECT pg_advisory_xact_lock(748291)`;
        await tx.unsafe(ESQUEMA);
      })
      .catch((e) => {
        g.__kolabEsquema = null;
        throw e;
      });
  }
  await g.__kolabEsquema;
  return sql;
}
