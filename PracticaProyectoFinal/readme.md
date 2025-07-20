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

``` 
bash
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
/src
  /routes
    /productos.js (Endpoint)
  /models
    /Products.js (Modelos Sequelize)
  server.js
.env (Conexiones)
```
--- 

#### 🔧 Instalación

1. Cloná el repositorio 
   ```
   bash
    git clone https://github.com/ange-r/Backend.git
    cd tu-repo
    npm install
    ```
---
#### ✅ Checklist de tareas

- [x] Conexión a DB
- [x] CRUD de productos
- [ ] Auth (en progreso)
