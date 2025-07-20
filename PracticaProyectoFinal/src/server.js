const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
    dotenv.config();
const bodyParser = require('body-parser');
const { conectar, desconectar } = require('./sequelize');   //Invoco a las funciones del manager

const PORT = process.env.PORT || 3006

app.use(express.json());   // Middleware p parsear los json que viene por body
const productosRoutes = require('./routes/productos'); // Traigo los endpoint de productos
app.use('/', productosRoutes); // Manejo peticiones de productos.js

// Método GET
app.get('/', async (req, res) => {
    res.send('Hola mundo - Esto es Sequelize')
});

// Middleware ERROR 404
app.use((req, res) => {
    res.status(404).send('La página que buscas no existe - Ruta no encontrada');
});

// Inicio del servidor con conexión a la DB
(async () => {
    try {
        await conectar(); 
        app.listen(PORT, () => {
            console.log(`Servidor inicializado en el puerto: ${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();

// Desconexión a la DB
process.on('SIGINT', async () => {
    console.log('Desconectando el servidor');
    await desconectar();
    process.exit();
});
