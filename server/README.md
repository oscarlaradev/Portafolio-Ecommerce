Server API (local)

1. Propósito
- Pequeña API Express para: autenticación (login/logout/session), recuperación de contraseña vía email/WhatsApp, y registro/consulta de estadísticas.

2. Ejecutar localmente
- Instalar dependencias del monorepo en la raíz: `npm install` (ya incluye backend deps añadidos).
- Crear un fichero `.env` en la raíz basado en `.env.example` y definir al menos `ADMIN_PASSWORD` y `JWT_SECRET`.
- Ejecutar el servidor: `npm run server` o `npm run start:server`. Por defecto escucha en `http://localhost:4000`.

3. Endpoints principales
- `POST /api/auth/login` { email, password } — inicia sesión, devuelve cookie `token` httpOnly.
- `POST /api/auth/logout` — borra cookie.
- `GET /api/auth/session` — comprueba sesión.
- `POST /api/auth/request-reset` { email, phone, via } — envía código por `email` o `whatsapp`.
- `POST /api/auth/reset` { email, token, newPassword } — restablece contraseña.
- `GET /api/stats` — devuelve estadísticas agregadas.
- `POST /api/stats/record` { key, increment } — registra un evento para sumar.

4. Configuración opcional (env)
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` — para envío de email.
- `TWILIO_SID`, `TWILIO_TOKEN`, `TWILIO_FROM` — para enviar WhatsApp (Twilio). Si no están, la petición de recuperación devolverá error de envío.

5. Seguridad recomendada
- Establecer `JWT_SECRET` fuerte en producción.
- Ejecutar detrás de TLS (HTTPS).
- Añadir rate-limiting y protección contra fuerza bruta para `/api/auth/login` y `/api/auth/request-reset`.
