# KOLAB · Guía del taller de comunicación consultiva

Versión en español y multiusuario de la guía del taller para Bizagi. Cada persona ingresa con su usuario y clave, y tiene su propio cuaderno guardado en su cuenta. Incluye un módulo para administrar usuarios.

Tecnología: Next.js y Postgres.

## Desplegar en Vercel

1. En Vercel, elige **Add New → Project** e importa este repositorio. No hay que cambiar nada de la configuración de compilación.
2. Antes o después del primer despliegue, en la pestaña **Storage** del proyecto, crea una base de datos Postgres (por ejemplo, Neon) y conéctala al proyecto. Esto agrega `DATABASE_URL` por ti. Si tu base es externa, agrega `DATABASE_URL` a mano.
3. En **Settings → Environment Variables**, agrega:
   - `ADMIN_USUARIO`: el usuario con el que vas a ingresar, por ejemplo `edgar`.
   - `ADMIN_CLAVE`: una clave de al menos 10 caracteres.
4. Vuelve a desplegar (**Deployments → Redeploy**) para que tome las variables.

Las tablas se crean solas la primera vez que alguien usa el sitio.

## Primer ingreso como administrador

1. Entra al sitio e ingresa con `ADMIN_USUARIO` y `ADMIN_CLAVE`.
2. El sitio te pide cambiar la clave. Desde ese momento, tu clave es la nueva.
3. Ve a **Usuarios** en el menú y crea las cuentas. Puedes escribir la clave o dejar que el sistema la genere. Cada persona debe cambiarla en su primer ingreso.

Esas variables solo sirven mientras no haya ningún administrador activo, así que dejarlas configuradas no abre una puerta trasera.

## Si pierdes el acceso de administrador

1. En Vercel, agrega `ADMIN_RESTABLECER=si` y vuelve a desplegar.
2. Ingresa con `ADMIN_USUARIO` y `ADMIN_CLAVE`, y cambia la clave.
3. **Quita `ADMIN_RESTABLECER` y vuelve a desplegar.** Mientras esté activa, esas credenciales siguen dando acceso de administrador.

Otro administrador también puede generarte una clave nueva desde **Usuarios**.

## Privacidad y seguridad

- Las claves se guardan cifradas con bcrypt; las sesiones van en una cookie `httpOnly`.
- Cada consulta del cuaderno se filtra por la sesión. Ni los participantes ni el administrador pueden ver cuadernos ajenos desde la aplicación. Quien tenga acceso directo a la base de datos sí podría verlos.
- Tras 5 intentos fallidos, el ingreso se bloquea por 15 minutos.
- Eliminar un usuario borra también su cuaderno, de forma definitiva.

## Desarrollo local

```bash
cp .env.example .env.local   # completa los valores
npm install
npm run dev
```

## Dónde cambiar el contenido

- `content/teoria.js`: las 39 entradas de teoría.
- `content/Caso.js`: el caso y el diagnóstico.
- `content/fases.js`: las cuatro fases y los campos de las hojas de trabajo.
