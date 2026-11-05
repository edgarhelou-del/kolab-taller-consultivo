import Link from 'next/link';
import { exigirUsuario } from '@/lib/auth';
import { Respaldo } from '@/components/Cuaderno';

export default async function Recursos() {
  await exigirUsuario();
  return (
    <>
      <p className="ceja">RECURSOS</p>
      <h1 className="titulo-pagina">Llévate lo aprendido.</h1>
      <p className="entrada-pagina">Los materiales del taller y tu propio trabajo terminado.</p>
      <h2 className="subtitulo">Los materiales del taller</h2>
      <div className="tres">
        <div className="tarjeta recurso"><b>Teoría y referencia</b><p>Las 39 entradas de teoría, con buscador. Para imprimir, abre todas las que necesites.</p><Link className="enlace" href="/teoria">Abrir →</Link></div>
        <div className="tarjeta recurso"><b>Caso y diagnóstico</b><p>La lectura previa, con el anexo de diagnóstico. Se puede imprimir o guardar en PDF.</p><Link className="enlace" href="/caso/resumen">Abrir →</Link></div>
        <div className="tarjeta recurso"><b>Hojas de trabajo</b><p>Las cuatro fases, con tus respuestas guardadas en tu cuenta.</p><Link className="enlace" href="/fase/1">Abrir →</Link></div>
      </div>
      <h2 className="subtitulo">Tu cuaderno</h2>
      <div className="dos">
        <div className="tarjeta recurso">
          <b>Revisa y exporta tu trabajo</b>
          <p>Revisa y exporta tus respuestas del caso o el cuaderno completo desde un solo lugar. Las reflexiones individuales no se incluyen en la exportación de respuestas del caso.</p>
          <Link className="enlace" href="/cuaderno">Abrir mi cuaderno →</Link>
        </div>
        <div className="tarjeta recurso">
          <b>Guarda una copia restaurable</b>
          <p>Un respaldo contiene tu cuaderno completo, incluidas las reflexiones individuales.</p>
          <Respaldo />
        </div>
      </div>
      <section className="bloque-oscuro">
        <div><h2>Una guía para la conversación.</h2></div>
        <div><p>Usa las referencias cuando las necesites y vuelve con tu grupo. Todos pueden tomar notas; acuerden cuál cuaderno usarán para presentar o compartir sus respuestas finales.</p></div>
      </section>
      <p className="ayuda">La teoría está en Teoría y referencia. Cada fase del caso combina las instrucciones del ejercicio y tu hoja de trabajo. Los facilitadores dan el resumen de Camila después de la sesión de preguntas; aquí no se incluyen materiales privados de los facilitadores.</p>
    </>
  );
}
