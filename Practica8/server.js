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
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const { json } = require('express');
const port = 3002;

const productos = [
    {id: 1, nombre: 'Henry', importe: 19000, stock: 58},
    {id: 2, nombre: 'Henry', importe: 10000, stock: 65},
    {id: 3, nombre: 'Henry', importe: 16500, stock: 15},
    {id: 4, nombre: 'Henry', importe: 19000, stock: 50},
    {id: 5, nombre: 'Henry', importe: 19000, stock: 550},
    {id: 6, nombre: 'Henry', importe: 19000, stock: 5},
];

const PRODUCTOS = 
app.get('/', (req, res) => {
    res.send('<h1>Este es un server con productos</h1>');
    console.log(productos);
});

app.get('/productos', (req, res) => {    
    res.json(productos);
});

app.get('/productos/:id', (req, res) => {
    console.log(req.params.id);
});

app.get('productos/:importe', (req, res) => {

});

app.use((req, res) => {
    res.status(404).send('<h1>Ha habido un error - Ruta no encontrada</h1>');
});

app.listen(3002, () => {
    console.log('Servidor iniciado en el puerto 3002');
});
