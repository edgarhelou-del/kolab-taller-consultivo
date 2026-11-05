import '@fontsource-variable/mulish';
import '@fontsource-variable/fraunces';
import './globals.css';

export const metadata = {
  title: 'Tu taller | KOLAB',
  description: 'Guía del taller de comunicación consultiva de KOLAB para Bizagi.',
  robots: { index: false, follow: false },
};
export const viewport = { themeColor: '#0A0F1D' };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
