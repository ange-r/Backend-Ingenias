/*
La estructura del servidor web base debe ser similar
● “/”
● “/productos”
● “/*”
Crearemos dos plantillas HTML/EJS. Una de ellas será servida a través de la URL
principal del sitio, la otra a través de la URL productos.
Debemos definir un encabezado <head> común para ambos documentos EJS,
e insertar este <head> en ambos documentos utilizando la función include()
de EJS.
El documento productos.ejs deberá contener una tabla HTML. En el apartado
<tbody> debemos generar cada fila <tr> y cada celda <td> HTML, a partir de
la información contenida en el array productos, utilizando para esto el ciclo
for de EJS.
Agregaremos un control de errores para las rutas inexistentes creando una
*/ 
const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('views')); //siempre serviremos un sitio estático


app.get('/', (req, res) => {
    const data = {
        title: 'Web con Motor de Plantillas',
        message:'Primer prueba con plantillas',
    };
    res.render('index', data);
})

app.get('/productos', (req, res) => {
    const data = {
        title: 'Web con Motor de Plantillas',
        message1:'PRODUCTOS',
        products: [
            { nombre: 'Cuchillo', precio: 1500 },
            { nombre: 'Delantal', precio: 3000 },
            { nombre: 'Gorro', precio: 1000 }
          ]
    };
    res.render('productos', data);
})

app.use((req, res) => {
    res.status(404).json({
        error: "404",
        description: "No se encuentra la ruta o recurso solicitado"
    })
})

app.listen(3001, () => {
    console.log('Servidor iniciado en puerto 3001');
})
