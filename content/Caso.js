// Caso Banco Horizonte: lectura previa y diagnóstico (contenido estático).
export function CasoResumen() {
  return (
    <div className="prosa">
      <h2>Apertura de cuentas para pequeñas empresas</h2>
      <p>Preparación obligatoria para el taller. Lee este caso y su anexo de diagnóstico antes de asistir. Calcula unos 15 minutos. No hay que entregar nada por escrito. Ten el documento a la mano durante el taller.</p>
      <h3>La situación</h3>
      <p>Banco Horizonte quiere hacer crecer sus relaciones con las pequeñas empresas. Los empresarios se quejan de solicitudes repetidas y de no tener claridad sobre el avance cuando abren una cuenta. Los gerentes de relación persiguen actualizaciones entre Operaciones y Cumplimiento. El personal usa correo electrónico y hojas de cálculo compartidas junto con el sistema central del banco.</p>
      <p>Camila Santos, directora de pequeñas empresas, le encargó a Ladera Advisory revisar el problema. El diagnóstico inicial está terminado y aparece en el anexo. Ahora el banco necesita una dirección de mejora razonada y un primer alcance. La dirección considerará la propuesta de financiación completa en seis semanas.</p>
      <h3>La solicitud de Camila</h3>
      <blockquote>“¿Pueden mostrarnos cómo Bizagi podría mejorar la apertura de cuentas? Nuestros clientes dicen que toma demasiado tiempo y nuestros equipos gastan tiempo persiguiendo actualizaciones. La dirección quiere una recomendación en seis semanas.”</blockquote>
      <div className="tabla-envoltura"><table>
        <thead><tr><th>Persona</th><th>Rol</th></tr></thead>
        <tbody>
          <tr><td>Camila Santos</td><td>Directora de pequeñas empresas y patrocinadora</td></tr>
          <tr><td>Sofía Rojas</td><td>Líder de Operaciones</td></tr>
          <tr><td>Andrés Vega</td><td>Líder de Cumplimiento</td></tr>
          <tr><td>Mariana Torres</td><td>Líder de TI</td></tr>
          <tr><td>Diego Morales</td><td>Gerente de relación</td></tr>
        </tbody>
      </table></div>
      <h3>Su tarea</h3>
      <p>Ustedes son un equipo mixto que asesora al banco. Usen el diagnóstico como base de evidencia operativa. En el taller, hablen con Camila para aclarar sus expectativas, prioridades, preferencias y definición de éxito. Luego recomienden una mejora, expliquen la elección y respondan a sus preocupaciones.</p>
      <p>El diagnóstico inicial aporta evidencia suficiente para este ejercicio. La tarea no requiere una nueva investigación operativa, una arquitectura de solución detallada ni un modelo financiero. Las cuatro fases ocurren en el punto de decisión de hoy. No pasan semanas y la implementación no ha comenzado.</p>
      <p className="nota-ficcion">Caso ficticio de formación. Banco Horizonte, Ladera Advisory, las personas y todas las cifras son ficticios. El informe es un ejemplo de aprendizaje, no un trabajo de consultoría real.</p>
    </div>
  );
}

export function CasoDiagnostico() {
  return (
    <div className="prosa">
      <h2>Anexo: informe de diagnóstico inicial</h2>
      <p className="subtitulo-informe">Ladera Advisory / Preparado para Camila Santos<br />Apertura de cuentas para pequeñas empresas / Fase de diagnóstico terminada</p>
      <h3>Evaluación ejecutiva</h3>
      <p>Las dificultades del banco en la apertura de cuentas surgen de requisitos inconsistentes, información de las solicitudes fragmentada y traspasos en los que nadie acepta de manera confiable la siguiente acción. En conjunto, estas condiciones le causan al cliente un esfuerzo evitable y hacen difícil explicar el avance. La lista de verificación anterior mejoró la completitud al comienzo, pero el banco no sostuvo la responsabilidad, la orientación y la práctica que la respaldaban.</p>
      <p>Los hallazgos sustentan una mejora inicial enfocada en cómo se preparan y coordinan las solicitudes. No establecen cuál es el mejor enfoque de ejecución. El banco todavía debe elegir el primer alcance y decidir cómo equilibrar la disciplina operativa, la tecnología y el esfuerzo de implementación.</p>
      <h3>Alcance y base de la revisión</h3>
      <p>La revisión combinó un recorrido con Operaciones, gerentes de relación, Cumplimiento y TI; el examen de la guía de requisitos y de las herramientas de seguimiento actuales; y la revisión de 120 cuentas consecutivas completadas en el último mes completo. El personal clasificó la razón principal de una solicitud repetida en cada cuenta afectada. La revisión cubrió el recorrido desde la primera presentación hasta una cuenta utilizable.</p>
      <div className="tabla-envoltura"><table>
        <thead><tr><th>Evidencia</th><th>Hallazgo</th></tr></thead>
        <tbody>
          <tr><td>Volumen mensual</td><td>Cerca de 600 solicitudes, según una estimación de la gerencia.</td></tr>
          <tr><td>Tiempo transcurrido</td><td>Mediana de 9 días hábiles en las 120 cuentas completadas.</td></tr>
          <tr><td>Solicitudes repetidas</td><td>42 de 120 cuentas tuvieron al menos una solicitud repetida, es decir, el 35 % de esta muestra.</td></tr>
          <tr><td>Razones principales en esas 42</td><td>26 se debieron a información ya entregada que no se encontró o no se reutilizó. 16 se debieron a requisitos iniciales poco claros o inconsistentes.</td></tr>
        </tbody>
      </table></div>
      <h3>El recorrido de la solicitud</h3>
      <p>Un gerente de relación ayuda al solicitante a reunir la información. Operaciones revisa que esté completa y coordina las revisiones requeridas. Cumplimiento valida los controles y las excepciones que correspondan. Después de las aprobaciones requeridas, el banco activa la cuenta en su sistema central. Las solicitudes de aclaración pueden devolver el trámite a un equipo anterior.</p>
      <p><strong>Límite de la evidencia:</strong> la muestra excluye las solicitudes incompletas y abandonadas. Las clasificaciones de 26 y 16 suman las 42 cuentas afectadas. Explican las solicitudes repetidas, no cada día del tiempo transcurrido.</p>
      <h3>Hallazgos del diagnóstico</h3>
      <p>Las cuatro perspectivas que siguen describen causas que interactúan dentro del mismo recorrido de la solicitud. Cada hallazgo vincula una condición observada con su consecuencia operativa.</p>
      <h4>Personas y responsabilidad</h4>
      <p>Los equipos entienden sus responsabilidades funcionales, pero en los traspasos no siempre se acepta la responsabilidad por la siguiente acción. En una de las solicitudes revisadas, Operaciones creía que el gerente de relación estaba consiguiendo un documento faltante, mientras que este creía que Cumplimiento lo estaba revisando. El expediente quedó en espera. Más tarde, el personal pidió información que el cliente ya había entregado.</p>
      <p>Esto ilustra una brecha de responsabilidad entre funciones. Además, la capacitación única sobre la lista de verificación le dio al personal poca práctica con casos inusuales. La evidencia no establece que al personal le falte compromiso ni que una capacitación más general resolvería por sí sola el problema.</p>
      <h4>Proceso y manejo de excepciones</h4>
      <p>El banco no tiene una rutina de traspaso aplicada de manera consistente que confirme la completitud, la siguiente acción aceptada y la responsabilidad por las excepciones. Las distintas interpretaciones de los requisitos hacen que las solicitudes pasen de un equipo a otro para aclaraciones. La lista de verificación anterior ayudó al principio, pero sus versiones divergieron y nadie mantuvo la guía de excepciones.</p>
      <p>Estas debilidades hacen que el avance dependa del seguimiento individual. La revisión identifica la coordinación y la orientación inconsistentes como causas que contribuyen al problema. No muestra que los controles requeridos de identidad y de negocio sean innecesarios.</p>
      <h4>Tecnología y seguimiento</h4>
      <p>El correo electrónico y las hojas de cálculo compartidas operan junto con el sistema central. La hoja de cálculo puede registrar responsables y estado, pero el personal debe volver a digitar las actualizaciones a mano. No señala automáticamente las acciones vencidas. Por eso, mantener el registro al día depende de una disciplina diaria sostenida.</p>
      <p>Estas limitaciones amplifican las fallas de coordinación. La revisión no probó la integración, la seguridad ni el desempeño en producción, de modo que no puede establecer que una plataforma o un diseño de automatización en particular vaya a funcionar.</p>
      <h4>Información y requisitos</h4>
      <p>La información recibida está repartida en correos y carpetas, y los equipos no pueden establecer con confianza qué tiene ya el banco. El personal atribuyó 26 de los 42 casos de solicitud repetida a información que no se encontró o no se reutilizó. Atribuyó los 16 restantes a requisitos iniciales poco claros o inconsistentes.</p>
      <p>El hallazgo combinado es una visión compartida débil de los requisitos, la información recibida y el estado de la solicitud. Un documento puede estar en el banco sin que la siguiente persona que lo necesita pueda usarlo.</p>
      <h3>Implicaciones y límites del diagnóstico</h3>
      <h4>Cómo se combinan las causas</h4>
      <p>Los requisitos inconsistentes hacen incierto si una solicitud está lista. La información fragmentada impide que el equipo que recibe verifique con confianza qué hay disponible. Los traspasos no aceptados dejan poco clara la siguiente acción. El seguimiento manual no expone esas brechas de manera consistente, y por eso el personal persigue actualizaciones o repite solicitudes. El mantenimiento débil y la poca práctica dejaron que se perdiera la rutina de la lista de verificación anterior.</p>
      <p>Los hallazgos apuntan a un problema de coordinación conectado. Mejorar un solo elemento de forma aislada puede dejar intactas las demás fuentes de reproceso. La recomendación debe explicar cómo el alcance elegido aborda las causas conectadas y cómo se mantendría la nueva forma de trabajar.</p>
      <h4>Implicaciones para el negocio</h4>
      <p>Los solicitantes gastan esfuerzo adicional respondiendo y no pueden entender con confianza el avance. Los gerentes de relación gastan en perseguir información un tiempo que podrían usar para ayudar a los clientes a preparar sus solicitudes. Operaciones y Cumplimiento enfrentan trabajo evitable de aclaración y coordinación. Estos efectos justifican un esfuerzo de mejora, aunque la revisión no ha cuantificado los ingresos perdidos, el abandono, los ahorros de personal ni la reducción de tiempo alcanzable.</p>
      <h4>Condiciones para la siguiente decisión</h4>
      <p>Los controles requeridos de identidad y de negocio deben terminar antes de la activación, con un registro de aprobación. El sistema central se mantendrá. Camila puede patrocinar un alcance inicial de un producto para pequeñas empresas en dos sucursales. El enfoque específico de la mejora lo debe recomendar el equipo asesor.</p>
      <div className="tabla-envoltura"><table>
        <thead><tr><th>Participación reservada por seis semanas</th><th>Tiempo disponible</th></tr></thead>
        <tbody>
          <tr><td>Sofía y Diego</td><td>Hasta medio día por semana cada uno para el diseño.</td></tr>
          <tr><td>Andrés y Mariana</td><td>Hasta una hora por semana cada uno para validar requisitos.</td></tr>
        </tbody>
      </table></div>
      <p>Sus gerentes han reservado esta participación. Camila puede respaldar una dirección y un primer alcance, y autorizar el uso de ese tiempo. Puede patrocinar su desarrollo hasta la propuesta completa. El comité directivo decide la financiación de la implementación. El personal de implementación y la fecha de lanzamiento todavía necesitan aprobación.</p>
      <h4>Lo que falta decidir</h4>
      <p>El diagnóstico establece el problema operativo. La siguiente conversación debe aclarar qué resultados prioriza Camila, cómo se vería el éxito, sus preferencias y las concesiones que acepta, y qué espera de la recomendación. El ajuste técnico, el esfuerzo, el costo y el beneficio alcanzable requieren validación antes de asumir compromisos de implementación.</p>
      <p>El informe no selecciona una solución ni un proveedor. Aporta la base para una recomendación de mejora razonada y para la posterior evaluación de la implementación.</p>
      <p className="nota-ficcion">Caso ficticio de formación. Banco Horizonte, Ladera Advisory, las personas y todas las cifras son ficticios.</p>
    </div>
  );
}
