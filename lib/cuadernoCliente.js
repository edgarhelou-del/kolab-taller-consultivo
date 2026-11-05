'use client';
// Guardado automático en la cuenta. Ordena las escrituras y espera a que terminen antes de leer,
// para que al cambiar de fase nunca se vean (ni se sobrescriban) respuestas viejas.
let pendientes = {};
let temporizador = null;
let cola = Promise.resolve();

function avisar(estado) {
  window.dispatchEvent(new CustomEvent('kolab-guardado', { detail: estado }));
}

function enviar(cambios, keepalive) {
  return fetch('/api/cuaderno', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cambios }),
    keepalive,
  }).then((r) => {
    if (r.status === 401) window.location.assign('/ingresar');
    if (!r.ok) throw new Error('guardado');
  });
}

export function guardarSinEspera() {
  clearTimeout(temporizador);
  if (Object.keys(pendientes).length) enviar(pendientes, true).catch(() => {});
}

export function vaciar() {
  clearTimeout(temporizador);
  const cambios = pendientes;
  if (!Object.keys(cambios).length) return cola;
  pendientes = {};
  avisar('guardando');
  cola = cola
    .then(() => enviar(cambios, false))
    .then(() => {
      if (!Object.keys(pendientes).length) avisar('guardado');
    })
    .catch(() => {
      pendientes = { ...cambios, ...pendientes };
      avisar('error');
      clearTimeout(temporizador);
      temporizador = setTimeout(vaciar, 5000);
    });
  return cola;
}

export function guardar(campo, valor) {
  pendientes[campo] = valor;
  avisar('guardando');
  clearTimeout(temporizador);
  temporizador = setTimeout(vaciar, 700);
}

export async function cargar() {
  await vaciar();
  const r = await fetch('/api/cuaderno', { cache: 'no-store' });
  if (r.status === 401) window.location.assign('/ingresar');
  if (!r.ok) throw new Error('carga');
  const { valores } = await r.json();
  return { ...valores, ...pendientes };
}

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', guardarSinEspera);
}
