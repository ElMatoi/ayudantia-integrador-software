# AYUDANTIA-INTEGRADOR-SOFTWARE
El siguiente repositorio contiene lo basico para iniciar en el desarrollo de backend para la asignatura.
Mediante el transcurso de la asignatura se ira actualizando el repositorio con mas funcionalidades.

## Instrucciones
### Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
```
### Construir y evantar los Servicios del backend y la base de datos

```bash
docker compose build --no-cache
docker compose up -d
```

### . env
crear un archivo .env en la carpeta del backend con las siguientes credenciales:
```bash
APP_PORT=3000
DATABASE_TYPE="postgres"
DATABASE_HOST="localhost"
DATABASE_PORT="5432"
DATABASE_USERNAME="postgres"
DATABASE_PASSWORD="pass"
DATABASE_NAME="dbpostgres"
```



## API 

### Información de la solicitud
- **URL**: `/users/createUser`
- **Método**: `POST`
- **Autenticación**: No requerida ( por el momento)
## Cuerpo de la solicitud ( Por el momento )
```json
{
  "name":"user name",
   "rut":"rut user",
}
