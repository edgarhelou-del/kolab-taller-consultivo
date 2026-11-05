import { exigirUsuario } from '@/lib/auth';
import Marco from '@/components/Marco';

export default async function Layout({ children }) {
  const u = await exigirUsuario();
  return <Marco usuario={{ nombre: u.nombre, rol: u.rol }}>{children}</Marco>;
}
