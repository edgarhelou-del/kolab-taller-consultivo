import { exigirUsuario } from '@/lib/auth';
import Cuaderno from '@/components/Cuaderno';

export default async function PaginaCuaderno() {
  await exigirUsuario();
  return (
    <>
      <p className="ceja">MI CUADERNO</p>
      <h1 className="titulo-pagina">Tu trabajo, en un solo lugar.</h1>
      <p className="entrada-pagina">Revisa tus respuestas de las cuatro fases. Tu grupo elige cuál cuaderno representa sus respuestas acordadas.</p>
      <Cuaderno />
    </>
  );
}
