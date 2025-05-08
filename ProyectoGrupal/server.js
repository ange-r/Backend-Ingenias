const express = require('express');
const app = express();
const path =require('path');

app.use(express.static(path.join(__dirname, 'trailerflix')));

app.get('/', (req, res) => {
    res.send('Ruta raiz');
});


app.listen (3008, () => {
    console.log('Servidor iniciado en el puerto: 3008')
});


/*const trailerflix = JSON.parse(fs.readFileSync('./database/trailerflix.json', 'utf-8'));
const parametros= normParam(req.params.title);
const resultados = trailerflix.filter( pelicula =>{return normParam(pelicula.titulo).includes(parametros)});
const removeAccents = require('remove-accents');
const fs = require('fs');

function normParam(parametro){
let para = removeAccents(parametro.trim().toLowerCase());
return para;           sacca tilde, espacios y vuelve todo minusculas
}*/