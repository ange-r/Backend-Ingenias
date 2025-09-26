const express = require('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
    dotenv.config();
const secretKey = process.env.SECRET_KEY;
const userToValidate = { username: 'admin', password:'123456'};
const { conectar, desconectar } = require('./sequelize');   //Invoco a las funciones del manager

const PORT = process.env.PORT || 3006

app.use(express.json());   // Middleware p parsear los json que viene por body
const productosRoutes = require('./routes/productos'); // Traigo los endpoint de productos
const { error } = require('console');
app.use('/', productosRoutes); // Manejo peticiones de productos.js

// Login
app.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(`Datos recibidos: Usuario: ${username}, Password: ${password}`)
    if (username === userToValidate.username && password === userToValidate.password) {
        const token = jwt.sign({ username: username}, secretKey, {expiresIn: '1h'})
        res.json({token: token}) 
    } else {
        res.status(401).json({ error: 'Credenciales inválidas'});
    }
});

// Método GET
app.get('/', async (req, res) => {
    res.send('Hola mundo - Esto es Sequelize')
});

// Ruta protegida JWT
app.get('/perfilusuario', verifyToken, (req, res) => {  
    const username = req.decoded.username;
    res.json({mensaje: `Hola ${username}! Esta ruta está protegida.`}) 
});

// Middleware ERROR 404
app.use((req, res) => {
    res.status(404).send('La página que buscas no existe - Ruta no encontrada');
});

// Mideleware Validar token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
        if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
        }
        jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.decoded = decoded;  // guardo el payload decodificado
        next();          // paso al siguiente middleware
        });
};

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

