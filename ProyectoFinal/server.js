const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
    dotenv.config();
const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.send('Hola mundo')
});

app.use((req, res) => {
    res.status(404).send('La página que buscas no existe - Ruta no encontrada');
});

app.listen(PORT, ()=> {
    console.log(`Servidor inicializado en el Puerto: ${PORT}`);
});
