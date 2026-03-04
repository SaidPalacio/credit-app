Ejecutar el archivo init.sql.

Desde la carpeta database/:

psql -U postgres -d credits_db -f init.sql

Ejecutar psql sin configurar PATH

En lugar de usar psql, ejecuta directamente:
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -d credits_db -f init.sql
Ajusta 16 según tu versión (15, 14, etc).


En carpeta backend:

node server.js


Debe aparecer:

Conectado a PostgreSQL
Servidor corriendo en puerto 3000
SMTP listo

Para que funcione el envio por correo se debe hacer esto
Entra a tu cuenta Google.

Seguridad.

Activa Verificación en dos pasos.

Luego entra a:
Seguridad → Contraseñas de aplicaciones.

Genera una nueva:

Aplicación: Mail
Google te dará algo como:

abcd efgh ijkl mnop

En el .env ponlo sin espacios:
EMAIL_PASS=abcdefghijklmnop
En DB_PASSWORD debes poner la contraseña que tengas

Ir a carpeta Angular:

cd frontend
npm install
ng serve

Abrir navegador:

http://localhost:4200

8. Flujo del Sistema

Registrar crédito desde Angular.

Angular envía POST a:

http://localhost:3000/api/credits


Express valida con Joi.

Se guarda en PostgreSQL.

Se agrega a cola.

Worker envía correo en segundo plano.

Respuesta vuelve al frontend.

Crédito aparece en listado.
