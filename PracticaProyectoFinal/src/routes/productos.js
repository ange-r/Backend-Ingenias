const express = require('express');
const router = express.Router();
const path = require('path');
const dotenv = require('dotenv');
    dotenv.config();
const bodyParser = require('body-parser');
    // Esto me tira gpt - Preguntar ¿esta es una buena práctica suplantando a body-parser?:
    // app.use(express.json()); // Para leer JSON
const { conectar, desconectar } = require('../sequelize');   //Invoco a las funciones del manager
const products = require('../models/Products')    // Invoco el modelo del objeto Producto

// Método POST - Crear Productos
router.post('/productos', async (req, res) => {
  try {
    const {ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOrder, ReorderLevel, Discontinued} = req.body;
    const nuevoProducto = await products.create({ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOrder, ReorderLevel, Discontinued});
    res.status(201).json(nuevoProducto);
  } catch(error) {
    console.error('Error al crear el producto: ', error);
    res.status(500).json({ error: 'Error al crear el producto.'});
  } 
});

// Método PUT - Actualizar un producto
router.put('/productos/:id', async (req, res) => {
  try {
    const productoID = req.params.id;
    const resultado = await products.findByPk(productoID);
        if(!resultado) {
            res.status(404).json({error: 'No se a encontrado el producto solicitado.'})
        } else {
            const {ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOrder, ReorderLevel, Discontinued} = req.body;
            await resultado.update({ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOrder, ReorderLevel, Discontinued});
        };
    res.json({mensaje: 'Producto actualizado correctamente.', resultado});
  } catch(error) {
    console.error('Error al actualizar el producto: ', error);
    res.status(500).json({ error: 'Error al actualizar el producto.'});
  } 
});

// Método GET - Mostrar Tabla Productos
router.get('/productos', async (req, res) => {
    try {
        const resultado = await products.findAll();
        res.json(resultado);
    } catch(error) {
        console.log('Error al hacer la petición: ', error);
        res.status(500).json({error: 'Error al hacer la petición.'});
    }
});

// Método GET - Mostrar 1 producto de Tabla Productos
router.get('/productos/:id', async (req, res) => {
    try {
        const productoID = req.params.id;
        const resultado = await products.findByPk(productoID);
        if (!resultado) {
            res.status(404).json({error: 'No se a encontrado el producto solicitado.'})
        } else {
        res.status(201).json(resultado);
        }
    } catch(error) {
        console.log('Error al hacer la petición: ', error);
        res.status(500).json({error: 'Error al hacer la petición.'});
    }
});

// Método DELETE - Eliminar 1 producto de Tabla Productos
router.delete('/productos/:id', async (req, res) => {
    try {
        const productoID = req.params.id;
        const resultado = await products.findByPk(productoID);
        !resultado  ? res.status(404).json({error: 'No se a encontrado el producto solicitado.'})
              : await resultado.destroy();
        res.json({mensaje: 'Producto eliminado correctamente.'});
    } catch(error) {
        console.log('Error al eliminar el producto: ', error);
        res.status(500).json({error: 'Error al eliminar el producto.'});
    }
});

module.exports = router;