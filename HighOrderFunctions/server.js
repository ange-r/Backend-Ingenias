/* 
Crearemos un proyecto con Express JS
construyendo un backend que sirva datos,
mediante diferentes endpoints, a partir de un
array de objetos. Éste contendrá las siguientes
rutas:
● /productos
● /productos/:id
● /productos/:nombre

Dispondremos de un array de productos, que
tendrá estas características: {id - nombre -
importe - stock}
*/
const productos = [
    {id: 1, nombre: 'Henry Manccini', importe: 19000, stock: 58},
    {id: 2, nombre: 'Nami', importe: 10000, stock: 65},
    {id: 3, nombre: 'Henry Ford', importe: 16500, stock: 15},
    {id: 4, nombre: 'Jules', importe: 19000, stock: 50},
    {id: 5, nombre: 'Julien', importe: 19000, stock: 550},
    {id: 6, nombre: 'Marie', importe: 19000, stock: 5},
];

const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const port = 3002;


app.get('/', (req, res) => {
    res.send('<h1>Este es un server con productos</h1>');
});

app.get('/productos', (req, res) => {    
    res.json(productos);
});
/*
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const resultado = productos.find(producto => producto.id === id);
    res.send(resultado);
        if (resultado !== 'undefined'){
            console.log('El id solicitado no se encuentra definido - Ingrese otro valor.')};
            res.send('<h3>El id solicitado no se encuentra definido - Ingrese otro valor.</h3>'); 
});
*/
app.get('/productos/:nombre', (req, res) => {
    const item = req.params.nombre.trim().toLowerCase();
    const resultado = productos.filter(producto => producto.nombre.toLowerCase().includes(item));
        if (resultado.length > 0) { res.send(resultado);
        } else {
            res.send('<h3>El nombre buscado no se encuentra en nuestros registros.</h3>');
        };
});

app.use((req, res) => {
    res.status(404).send('<h1>Ha habido un error - Ruta no encontrada</h1>');
});

app.listen(3002, () => {
    console.log('Servidor iniciado en el puerto 3002');
});
