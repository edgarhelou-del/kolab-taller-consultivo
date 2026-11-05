// Las cuatro fases del taller y los campos de la hoja de trabajo.
// individual: true → no se incluye en la exportación de respuestas del caso.
export const FASES = [
  {
    n: 1, t: 'Entender la necesidad', producto: 'Un resumen compartido de la necesidad', min: 25,
    resumen: 'Usa el diagnóstico terminado para aclarar las expectativas, las prioridades y la definición de éxito de Camila. Acuerden un resumen de la necesidad de dos frases.',
    pasos: [
      ['3 min', 'Preparen dos preguntas', 'Conversen sobre qué expectativas, preferencias o criterios de decisión falta aclarar.'],
      ['10 min', 'Participen en la sesión de preguntas con la patrocinadora', 'El salón hace 5 o 6 preguntas principales, con repreguntas cortas. Edgar hace de Camila. Escuchen a los demás grupos además del suyo.'],
      ['3 min', 'Confirmen las expectativas de la patrocinadora', 'Los facilitadores comparten el resumen común, incluidos los puntos esenciales que no se tocaron.'],
      ['4 min', 'Escriban el resumen de la necesidad', 'Conecten el diagnóstico con el resultado prioritario y con una incertidumbre importante.'],
      ['5 min', 'Puesta en común', 'Comparen algunos resúmenes e identifiquen una respuesta que haya orientado su interpretación.'],
    ],
    aviso: 'El diagnóstico operativo está terminado. La conversación aclara qué espera la patrocinadora de su asesoría.',
    refs: [['Solicitud, necesidad y resultado', 'solicitud-necesidad-resultado'], ['Preguntas con un propósito', 'preguntas-con-proposito'], ['Un resumen compartido', 'resumen-compartido']],
    traer: [],
    bloques: [
      { eyebrow: 'Reflexión individual / antes de la fase 1', campos: [
        { id: 'p1_reflexion', t: 'Mi primera respuesta', ayuda: 'Después del repaso del caso, ¿qué le dirías a Camila? Guárdala para la reflexión de cierre. Esta entrada no se incluye en la exportación de respuestas del caso.', individual: true, filas: 4 } ] },
      { eyebrow: 'Antes de la sesión de preguntas', t: 'Sus dos preguntas prioritarias', ayuda: 'Preparen dos preguntas en grupo. El salón hará 5 o 6 preguntas principales en total.', campos: [
        { id: 'p1_q1', t: 'Pregunta 1', ayuda: 'Pregunten qué podría cambiar sus prioridades, sus criterios de decisión o su recomendación.', filas: 3 },
        { id: 'p1_q2', t: 'Pregunta 2', ayuda: 'Elijan otra pregunta que pueda orientar de manera importante la asesoría.', filas: 3 } ] },
      { eyebrow: 'Escuchar y luego confirmar', campos: [
        { id: 'p1_aclaro', t: 'Lo que Camila aclaró', ayuda: 'Anota su resultado prioritario, sus expectativas de éxito, sus preferencias y las concesiones que acepta.', filas: 5 },
        { id: 'p1_significa', t: 'Lo que esto significa para nuestra asesoría', ayuda: '¿Qué expectativa cambia la forma de interpretar o priorizar los hallazgos del diagnóstico?', filas: 4 } ] },
      { eyebrow: 'El producto de la fase 1', destacado: true, campos: [
        { id: 'p1_brief', t: 'Su resumen de la necesidad en dos frases', ayuda: 'Conecten el diagnóstico con el resultado prioritario. Incluyan la principal incertidumbre para la recomendación.', filas: 5 } ] },
    ],
  },
  {
    n: 2, t: 'Recomendar', producto: 'Una recomendación razonada', min: 20,
    resumen: 'Usa el diagnóstico y las expectativas aclaradas por Camila para comparar dos enfoques creíbles. Explica qué cambia en el trabajo diario, por dónde empezar y por qué tu elección es preferible.',
    pasos: [
      ['6 min', 'Comparen dos enfoques', 'Acuerden tres criterios de decisión. Comparen cómo ayuda cada enfoque y qué requiere.'],
      ['6 min', 'Elijan la dirección y el primer alcance', 'Expliquen la mejora operativa, el valor esperado y la concesión importante. Indiquen qué dejarían para después.'],
      ['3 min', 'Definan el éxito y la decisión', 'Elijan una medida de resultado y una condición protegida. Indiquen la decisión, la primera acción, el responsable propuesto, el punto de revisión y la aprobación pendiente.'],
      ['5 min', 'Puesta en común', 'Expliquen el razonamiento detrás de su elección. Distingan la evidencia de los beneficios esperados y de los compromisos propuestos.'],
    ],
    aviso: 'Las cuatro fases ocurren en el punto de decisión de hoy. Seis semanas es el plazo para la propuesta de financiación completa. La implementación no ha comenzado.',
    refs: [['Comparar opciones', 'criterios'], ['Construir el caso', 'logica-recomendacion'], ['Habilitar la acción', 'siguiente-paso']],
    traer: [['p1_brief', 'Su resumen de la necesidad (fase 1)'], ['p1_aclaro', 'Lo que Camila aclaró']],
    cierre: 'Pausa del taller: 10 minutos antes de la fase 3.',
    bloques: [
      { eyebrow: 'Comparar opciones', campos: [
        { id: 'p2_criterios', t: 'Sus tres criterios de decisión', ayuda: 'Usen el diagnóstico y las prioridades de Camila.', filas: 4 } ] },
      { eyebrow: 'Dos enfoques creíbles', t: 'Enfoque A', campos: [
        { id: 'p2_a', t: 'Enfoque A', ayuda: 'Nombren un enfoque creíble.', filas: 2 },
        { id: 'p2_a_ayuda', t: 'Por qué podría ayudar el enfoque A', ayuda: 'Evalúenlo frente a sus tres criterios.', filas: 3 },
        { id: 'p2_a_concesion', t: 'Enfoque A: concesión o condición', ayuda: '¿Qué requiere o qué hace más difícil este enfoque?', filas: 3 } ] },
      { t: 'Enfoque B', campos: [
        { id: 'p2_b', t: 'Enfoque B', ayuda: 'Nombren un enfoque claramente distinto.', filas: 2 },
        { id: 'p2_b_ayuda', t: 'Por qué podría ayudar el enfoque B', ayuda: 'Evalúenlo frente a los mismos criterios.', filas: 3 },
        { id: 'p2_b_concesion', t: 'Enfoque B: concesión o condición', ayuda: '¿Qué requiere o qué hace más difícil este enfoque?', filas: 3 } ] },
      { eyebrow: 'Construir el caso', campos: [
        { id: 'p2_direccion', t: 'Su dirección recomendada y primer alcance', ayuda: '¿Qué debería cambiar el banco? ¿Por dónde empezaríamos, qué dejaríamos para después y qué concesión aceptamos?', filas: 5 },
        { id: 'p2_cambio', t: 'Cómo cambia el trabajo y por qué debería ayudar', ayuda: 'Conecten el cambio operativo con las causas diagnosticadas y con el resultado prioritario de la patrocinadora.', filas: 5 } ] },
      { eyebrow: 'Habilitar la acción', destacado: true, campos: [
        { id: 'p2_exito', t: 'Cómo evaluaríamos el éxito', ayuda: 'Elijan una medida de resultado y una condición que debe seguir protegida. Marquen las metas como propuestas.', filas: 4 },
        { id: 'p2_decision', t: 'La decisión que queremos y la primera acción', ayuda: '¿Qué debería respaldar Camila? Nombren el responsable propuesto, el punto de revisión y la aprobación pendiente.', filas: 4 } ] },
    ],
  },
  {
    n: 3, t: 'Construir el mensaje', producto: 'Un mensaje conciso para la patrocinadora', min: 20,
    resumen: 'Explícale tu recomendación de la fase 2 a la misma Camila que conociste en la fase 1. Muestra cómo cumple sus expectativas y pídele que respalde la dirección y el primer alcance. Apunta a un máximo de 120 palabras.',
    pasos: [
      ['8 min', 'Redacta tu mensaje para la patrocinadora', 'Incluye la mejora, el alcance, el valor, la evidencia, la concesión y la decisión que pides.'],
      ['4 min', 'Léeselo a un compañero', 'Pídele que repita la elección, su conexión con las prioridades de Camila y la decisión solicitada.'],
      ['3 min', 'Revisa para ganar claridad', 'Mejora la frase de apertura o de cierre y actualiza el mensaje completo para que quede listo para presentar.'],
      ['5 min', 'Puesta en común', 'Observen qué cambios hicieron que la asesoría fuera más clara y más fácil de evaluar para la patrocinadora.'],
    ],
    aviso: 'Mantén la solicitud dentro de la decisión de hoy: respaldar la dirección y el primer alcance. Deja claro qué aprobaciones faltarían antes de la implementación.',
    refs: [['Organizar el razonamiento', 'cinco-preguntas'], ['Adaptarse a la audiencia', 'audiencia'], ['Dejar clara la solicitud', 'solicitud-decision']],
    traer: [['p2_direccion', 'Su dirección recomendada y primer alcance'], ['p2_cambio', 'Cómo cambia el trabajo y por qué debería ayudar'], ['p2_decision', 'La decisión que piden'], ['p1_aclaro', 'Lo que Camila aclaró']],
    bloques: [
      { eyebrow: 'Dejar clara la solicitud', campos: [
        { id: 'p3_decision', t: 'La decisión que queremos que tome Camila', ayuda: '¿Qué autorizaría su respaldo? ¿Qué aprobaciones seguirían pendientes?', filas: 4 } ] },
      { eyebrow: 'Redactar y afinar', campos: [
        { id: 'p3_mensaje', t: 'Su mensaje para la patrocinadora, de máximo 120 palabras', ayuda: 'Apunta a un minuto. Incluye la mejora, el alcance, el valor, la evidencia, la concesión y la decisión que pides.', filas: 8, palabras: 120 } ] },
      { eyebrow: 'Escuchar y revisar', destacado: true, campos: [
        { id: 'p3_oyente', t: 'Lo que escuchó quien te oyó', ayuda: '¿Puede tu compañero repetir la elección, la conexión con las prioridades de Camila y la decisión solicitada?', filas: 4 },
        { id: 'p3_frase', t: 'Tu frase de apertura o de cierre mejorada', ayuda: 'Revisa la frase que más mejora la claridad. Actualiza también el mensaje completo antes de presentar.', filas: 3 } ] },
    ],
  },
  {
    n: 4, t: 'Presentar y responder', producto: 'Una decisión con condiciones', min: 25,
    resumen: 'Presenta tu mensaje, escucha la pregunta de Camila y responde con la evidencia y las expectativas ya establecidas. Su pregunta llega después de la presentación. Registra la decisión con exactitud.',
    pasos: [
      ['2 min', 'Prepárate para presentar', 'Usa tu mensaje final de la fase 3. Ten a la mano el diagnóstico y las expectativas de la patrocinadora.'],
      ['8 min', 'Ensayen en equipo', 'Por turnos: 60 segundos de presentación y 30 segundos de retroalimentación por persona.'],
      ['8 min', 'Dos conversaciones en vivo con el cliente', 'Dos equipos tienen 4 minutos cada uno con Camila: 1 para presentar, 2 de diálogo y 1 de retroalimentación. Los demás escuchan.'],
      ['2 min', 'Todos practican una respuesta', 'Toma 1 minuto para redactar tu respuesta a la pregunta del cliente y 1 minuto para ensayarla en voz baja.'],
      ['5 min', 'Puesta en común y registro de la decisión', 'Recojan la retroalimentación útil y distingan lo aceptado de lo que sigue propuesto o requiere aprobación.'],
    ],
    aviso: 'Registra un respaldo solo cuando Camila realmente lo dé. Los equipos que no reciban una decisión dejan la decisión solicitada marcada como “Propuesta”.',
    refs: [['Presentar la asesoría', 'presentacion-clara'], ['Explorar la preocupación', 'preocupacion'], ['Responder con evidencia', 'respuesta-responsable'], ['Confirmar la decisión', 'apropiacion']],
    traer: [['p3_mensaje', 'Tu mensaje final para la patrocinadora'], ['p1_aclaro', 'Lo que Camila aclaró']],
    bloques: [
      { eyebrow: 'Después de la presentación al cliente', campos: [
        { id: 'p4_pregunta', t: 'La pregunta del cliente después de la presentación', ayuda: 'Registra la pregunta y la preocupación que hay detrás.', filas: 4 } ] },
      { eyebrow: 'Práctica individual', ayuda: 'Estas entradas quedan en tu cuaderno y no se incluyen en la exportación de respuestas del caso.', campos: [
        { id: 'p4_respuesta', t: 'Mi respuesta', ayuda: 'Usa tu recomendación y las expectativas establecidas en la fase 1.', individual: true, filas: 5 },
        { id: 'p4_segundo', t: 'Retroalimentación y segundo intento', ayuda: 'Un comportamiento que ayudó. Una frase para mejorar y volver a practicar.', individual: true, filas: 4 } ] },
      { eyebrow: 'La decisión que sigue adelante', destacado: true, campos: [
        { id: 'p4_estado', t: 'Estado de la decisión', ayuda: 'Déjala en “Propuesta” a menos que tu equipo reciba una decisión real de Camila. El respaldo no implica financiación de la implementación ni aprobación del lanzamiento.', tipo: 'opciones', opciones: ['Propuesta', 'Respaldada', 'Respaldada con condiciones', 'Se pidió revisión', 'No respaldada'], omision: 'Propuesta', noCuenta: true },
        { id: 'p4_decision', t: 'La decisión y las condiciones', ayuda: 'Registra la dirección respaldada o propuesta, el responsable, el punto de revisión y la aprobación pendiente. No trates como aceptados un rol o una fecha propuestos.', filas: 5 } ] },
    ],
    cierreReflexion: {
      eyebrow: 'Reflexión individual / cierre · 10 minutos', t: 'Mi próxima conversación con un cliente',
      ayuda: 'Estas reflexiones quedan en tu cuaderno y no se incluyen en la exportación de respuestas del caso.',
      traer: [['p1_reflexion', 'Mi respuesta inicial']],
      campos: [
        { id: 'r_mejora', t: 'Cómo mejoraría mi respuesta inicial', ayuda: 'Compara tu primera respuesta con la asesoría que puedes dar ahora.', individual: true, filas: 4 },
        { id: 'r_practica', t: 'El comportamiento que voy a practicar', ayuda: 'Nombra una conversación real y una fecha. Comparte tu compromiso con un colega.', individual: true, filas: 3 },
        { id: 'r_observaciones', t: 'Observaciones adicionales', ayuda: 'Opcional. Guarda aquí cualquier otra observación del taller.', individual: true, filas: 3 } ],
    },
  },
];

export function camposDeFase(f) {
  const c = f.bloques.flatMap((b) => b.campos);
  return f.cierreReflexion ? [...c, ...f.cierreReflexion.campos] : c;
}
export const TODOS_LOS_CAMPOS = FASES.flatMap(camposDeFase);
export const NOMBRE_CUADERNO = 'nombre_cuaderno';
export const CAMPOS_VALIDOS = new Set([...TODOS_LOS_CAMPOS.map((c) => c.id), NOMBRE_CUADERNO]);
export const MAX_CARACTERES = 20000;
