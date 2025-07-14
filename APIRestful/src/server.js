const dotenv = require('dotenv');
    dotenv.config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3003
const { leerFrutas, guardarFrutas } = require('./frutasManager');   //Invoco a las funciones del manager

let DB = [];  //Variable donde guardar los objetos Fruta


// Middleware
app.use(bodyParser.json())
app.use((req, res, next) => {
    DB = leerFrutas();
    next();
})

// Métodos HTTP para responder a peticiones
// GETs
app.get('/', (req,res) => {
    res.status(201).send('<h1> 🍍🍍🍍 API Restful de Frutas 🍍🍍🍍</h1>');
})
// Muestro catálogo
app.get('/productos', (req, res) => {
    res.send(DB);
})
//  Muestro según ID pedido
app.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const resultado = DB.find(fruta => fruta.id === id);
    if (!resultado) {
        res.status(404).json({ error: 'El id ingresado no existe aún' });
    }
    res.send(resultado);
})

// POST
// Agrego items al json
app.post('/', (req, res) => {
    const nuevaFruta = req.body;
    DB.push(nuevaFruta);
    guardarFrutas(DB);
    res.status(201).send('Fruta agregada');
})

//  PUT
// Busco y modifico ID específico
app.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const i = DB.findIndex(fruta => fruta.id === id);
    if (i < 0) {
        res.status(404).json({ error: 'El id ingresado no existe aún' });
    }
    DB[i] = {...DB[i], ...req.body};
    guardarFrutas(DB);
        res.status(201).send('Fruta modificada');
})

//  DELETE
// Busco y elimino ID específico
app.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const i = DB.findIndex(fruta => fruta.id === id);
    if (i < 0) {
        res.status(404).json({ error: 'El id ingresado no existe aún' });
    }
    const frutaEliminada = DB.splice(i, 1)[0]; //splice(index, cantidad)[0]<< muestra el array eliminado
    guardarFrutas(DB);
        res.status(201).send('Fruta eliminada');
})

app.use((req, res) => {
    res.status(404).send('<h1>Ruta no encontrada</h1>');
})

app.listen(PORT, () => {
    console.log(`servidor iniciado en Puerto: ${PORT}`);
})

