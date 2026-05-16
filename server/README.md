Server API (local)

1. Propósito
- Pequeña API Express para: autenticación (login/logout/session) y registro/consulta de estadísticas.

2. Ejecutar localmente
- Instalar dependencias del monorepo en la raíz: `npm install` (ya incluye backend deps añadidos).
- Crear un fichero `.env` en la raíz basado en `.env.example` y definir al menos `ADMIN_PASSWORD` y `JWT_SECRET`.
- Ejecutar el servidor: `npm run server` o `npm run start:server`. Por defecto escucha en `http://localhost:4000`.

3. Endpoints principales
- `POST /api/auth/login` { email, password } — inicia sesión, devuelve cookie `token` httpOnly.
- `POST /api/auth/logout` — borra cookie.
- `GET /api/auth/session` — comprueba sesión.
- `POST /api/auth/set-password` { email, newPassword } — actualiza contraseña de forma manual.
- `GET /api/stats` — devuelve estadísticas agregadas.
- `POST /api/stats/record` { key, increment } — registra un evento para sumar.

4. Crear o actualizar contraseña admin
- Definir `ADMIN_EMAIL` y `ADMIN_PASSWORD` en `.env`.
- Ejecutar: `npm run set:admin-password`.
- Este comando crea el usuario admin si no existe, o actualiza su contraseña si ya existe.

5. Seguridad recomendada
- Establecer `JWT_SECRET` fuerte en producción.
- Ejecutar detrás de TLS (HTTPS).
- Añadir rate-limiting y protección contra fuerza bruta para `/api/auth/login`.
