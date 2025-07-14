# DOCUMENTACIÓN
## Pre Entrega 2  - _API Supermercado_
> El objetivo de la API es manejar el inventario de productos, para la venta, de un supermercado. 
> Cuenta con endpoints de consulta, carga, actualización y limpieza de datos.

#### <u>ÍNDICE:</u>
- [DOCUMENTACIÓN](#documentación)
  - [Pre Entrega 2  - _API Supermercado_](#pre-entrega-2----api-supermercado)
      - [ÍNDICE:](#índice)
  - [Requerimientos técnicos](#requerimientos-técnicos)
      - [Dependencias](#dependencias)
  - [La API](#la-api)
      - [Para Iniciar Servidor](#para-iniciar-servidor)
      - [Endpoints](#endpoints)
      - [Método POST](#método-post)
      - [Método PUT](#método-put)
      - [Método DELETE](#método-delete)
      - [GET /supermercado](#get-supermercado)
      - [GET /supermercado/nombre/:nombre](#get-supermercadonombrenombre)
      - [GET /supermercado/preecio/:precio](#get-supermercadopreecioprecio)


## Requerimientos técnicos
` APIRestful creada en Node.js, con servidor Express y base de datos de MongoDB.`
#### Dependencias
Instalar
* express
* dotenv
* mongodb

## La API
#### Para Iniciar Servidor
* cd PreEntrega2
* npx nodemon

#### Endpoints
-----

| PETICIÓN | URL | DESCRIPCIÓN |
|:--------:|-----|-------------|
| GET | [/supermercado](/supermercado) | Obtener todos los productos |
| GET | [/supermercado/:codigo](/supermercado) | Obtener un producto especifico |
| GET | [/supermercado/nombre/:nombre](/supermercado) | Obtener todos los productos que coincidan con *nombre*|
| GET | [/supermercado/precio/:precio](/supermercado) | Obtener todos los productos que tengan un precio mayor o igual a *precio*|
| GET | [/supermercado/precio/:categoria](/supermercado) | Obtener todos los productos que coincidan con *categoria*|
| POST | [/supermercado](/supermercado) | Agregar un nuevos producto |
| PUT | [/supermercado/:codigo](/supermercado) | Modificar un producto existente |
| DELETE | [/supermercado/:codigo](/supermercado) | Eliminar un producto existente |


------
#### <u>Método POST</u>
Este método se utiliza para agregar productos al inventario.

Se espera la entrada de datos de tipo json a traves del 'body', con la siguente estructura:
```json
    {   
      "codigo": 6205,
      "nombre": "Kale",
      "precio": 6.32,
      "categoria": "Verduras"
    }
```
#### <u>Método PUT</u>
Este método se utiliza para actualizar/modificar la información de los productos almacenados.

Se espera la entrada del dato _id, para seleccionar el objeto a modificar.
- Petición
```
PUT
http://localhost:3000/supermercado/:id
```

#### <u>Método DELETE</u>
Este método se utiliza para BORRAR la información de la base de datos.

Se espera la entrada del dato _id:
- Petición
```
DELETE
http://localhost:3000/supermercado/:id
```

#### <u>GET /supermercado</u>
Muestra por pantalla todos los productos alojados en la base de datos.
-  Petición
```
GET
http://localhost:3000/supermercado
```

#### <u>GET /supermercado/nombre/:nombre</u>
Muestra por pantalla todos los productos resultantes de la busqueda por 'nombre' parcial.
Ordenados alfabéticamente por la primer letra ingresada.

-  Petición
```
GET
http://localhost:3000/supermercado/nombre/:nombre

    http://localhost:3000/supermercado/nombre/p
```

#### <u>GET /supermercado/preecio/:precio</u>
Muestra por pantalla todos los productos resultantes de la busqueda por 'precio'.
-  Petición
```
GET
http://localhost:3000/supermercado/:precio

    http://localhost:3000/supermercado/precio/6.3   
```








