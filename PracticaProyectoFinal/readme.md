# 👩🏻‍💻 Práctica Final Backend Ingenias + 
## API Restful para gestión de productos usando Express - Sequelize - MySQL

  
#### 🛠 Tecnologías principales
- Node.js
- Express.js
- Sequelize
- MySQL
- Dotenv
- Nodemon
---
#### 🚀 Cómo levantar el proyecto

```bash
npm install
npm run dev
```
---
#### 🔌 Endpoints
| Método | Ruta                 | Descripción                             |
|--------|----------------------|-----------------------------------------|
| GET    | `/`                 | Ruta raíz                               |
| GET    | `/productos`        | Muestra todos los productos             |
| GET    | `/productos/:id`    | Muestra un producto según su ID          |
| POST   | `/productos`        | Carga un nuevo producto a la tabla      |
| PUT    | `/productos/:id`    | Modifica un producto según su ID        |
| DELETE | `/productos/:id`    | Elimina un producto según su ID         |

---
#### 📦 Estructura del proyecto


```
 .env (Variables de entorno)
 /src
   /routes
     /productos.js (Endpoint)
   /models
     /Products.js (Modelos Sequelize)
   server.js
```
--- 

#### 🔧 Instalación

1. Cloná el repositorio 
   ```bash
    git clone https://github.com/ange-r/Backend-Ingenias-/PracticaProyectoFinal
   ```
2. Copialo en tu carpeta y abrilo en tu terminal
3. Instala dependencias
   ```
    cd PracticaProyectoFinal
    npm install
   ```
---
#### Configurá tus variables de entorno:

- Crear un archivo .env en la raíz del proyecto con el siguiente contenido:
  ```
    DB_HOST=localhost
    DB_PORT=3306
    DB_NAME=Northwind
    DB_USER=root
    DB_PASSWORD=tu_contraseña_MySQL
    PORT=3005
  ```
---
#### ▶️ Cómo correr el servidor
  ```
    npm run dev
  ```

##### El servidor se levanta en:
#### 📍 http://localhost:3005
---
#### ✅ Checklist de tareas

- [x] Clonación repo e instalación de dependencias
- [x] Conexión a DB
- [x] CRUD de productos
