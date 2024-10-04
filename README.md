
# CRUD de Productos con Fastify

Este proyecto implementa un CRUD (Crear, Leer, Actualizar y Eliminar) de productos utilizando **Fastify**, un framework Node.js que prioriza el rendimiento.

## Requisitos

Antes de comenzar, asegúrate de tener los siguientes requisitos:

- [Node.js](https://nodejs.org) versión 20.x o superior
- [Fastify](https://www.fastify.io/)
- Base de datos PostgreSQL

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/AmadorQuispe/products_fastify.git
   ```

2. Ve al directorio del proyecto:

   ```bash
   cd tu-repositorio
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

4. Configura la base de datos. Crea un archivo `.env` en la raíz del proyecto con la configuración de conexión:

   ```
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=nombre_de_tu_base_de_datos
   PORT=3000
   ```

5. Ejecuta las migraciones de base de datos:

   ```bash
   npm run migrate
   ```

6. Inicia el servidor:

   ```bash
   npm run dev
   ```

El servidor estará corriendo en `http://localhost:3000`.

## Endpoints del CRUD de Productos

Los siguientes endpoints manejan las operaciones CRUD para el modelo de "Productos":

- **Crear un producto**: `POST /products`
- **Obtener todos los productos**: `GET /products`
- **Obtener un producto por ID**: `GET /products/:id`
- **Actualizar un producto**: `PUT /products/:id`
- **Eliminar un producto**: `DELETE /products/:id`

### Campos y Validaciones:

- `nombre`: string, requerido.
- `precio`: número, requerido, mayor que 0.
- `stock` : número, requerido, mayor que 0.
- `descripción`: string, requerido.

## Pruebas Rápidas con Visual Studio Code y REST Client

Para facilitar las pruebas rápidas de la API, puedes utilizar la extensión **REST Client** en Visual Studio Code:

1. Instala la extensión desde el siguiente enlace: [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

2. Ubica un archivo llamado `collection-api.http` en el directorio raíz del proyecto.

3. Para probar las diferentes operaciones CRUD, abre el archivo `collection-api.http` en Visual Studio Code y haz clic en `Send Request` sobre cualquiera de las solicitudes.



## Proceso de Aprendizaje

**Fastify** fue un framework que nunca había utilizado antes. Durante este proyecto, me enfoqué en aprender cómo configurar rutas, manejar peticiones HTTP y trabajar con validaciones.

### Recursos Utilizados

- [Documentación oficial de Fastify](https://www.fastify.io/docs/latest/)
- Tutoriales de Fastify en [Dev.to](https://dev.to/)
- Blogs y foros de la comunidad de Fastify

### Desafíos Encontrados

Uno de los mayores desafíos fue entender cómo Fastify maneja la validación de datos y cómo estructurar las respuestas de error. Gracias a la documentación oficial y algunos ejemplos prácticos, logré resolver estos problemas, aunque no al 100%.

Otro desafío fue el manejo de errores en la conexión a la base de datos, pero después de revisar la documentación de `pg` y los logs de Fastify, configuré correctamente las conexiones y manejé las excepciones adecuadamente. 

Otro desafío fué como crear las tablas en la base de datos desde mi proyecto sin ir a la base datos lo cual logré con un script de npm 

## Conclusión

Implementar este CRUD utilizando Fastify me permitió explorar un framework altamente optimizado para Node.js. La experiencia fue enriquecedora, ya que aprendí sobre el enfoque minimalista y el rendimiento en aplicaciones web.
