
# Projecto Market 

Este projecto se creo con la finalidad de dar solucion a la prueba Prueba Técnica Developer BackEnd0226


## Documentación de la API

La documentación de la API está generada utilizando Swagger. Puede acceder a ella:

http://localhost:9001/api/docs/

No olvidad cambiar el puerto al que estes usado 

## Despliege

Para implementar este proyecto, ejecute

En modo desarrollador:

```bash
  npm run dev
```
En modo producción:

```bash
  npm run dev
```


## Herramientas

Este proyecto utiliza las siguientes herramientas y librerías:

- **Node.js**: Entorno de ejecución de JavaScript en el servidor.

- **Express**: Marco de aplicación web para construir APIs de manera rápida.

- **Morgan**(opcional): Middleware para registro de solicitudes HTTP, facilita la depuración.

- **MySQL2**: Cliente MySQL para Node.js, proporciona conexión con bases de datos MySQL.

- **Sequelize**: ORM para Node.js, permite manejar bases de datos SQL con un enfoque orientado a objetos.

- **Swagger-UI-Express**: Integra la documentación de Swagger UI con aplicaciones Express para visualizar y probar la API.

- **Nodemon**(opcional): Herramienta de desarrollo que reinicia automáticamente el servidor al detectar cambios en el código.
## Configuración de Variables de Entorno

Para que la aplicación funcione correctamente, es necesario configurar las siguientes variables de entorno. Puede hacerlo creando un archivo `.env` en la raíz del proyecto y añadiendo las siguientes líneas:

```plaintext
HOST=         # Dirección del servidor de la base de datos
DATABASE=     # Nombre de la base de datos
USUARIO=      # Usuario de la base de datos
PASSWORD=     # Contraseña del usuario de la base de datos 
PORTDB=       # Puerto para la conexión con la base de datos
PORT=         # Puerto en el que se ejecutará el servidor de la aplicación
