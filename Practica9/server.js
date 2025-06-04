/* 
Al proyecto construído en las prácticas de la clase anterior,
debemos sumarle el archivo con la estructura .JSON que
nos compartirá la Profe.
Integraremos este archivo con los endpoint que creamos la clase
anterior. Los mismos eran:
● /productos
● /productos/:id
● /productos/:nombre
Este archivo con extensión .json, debe ser leído utilizando el
módulo FileSystem API. Luego, su contenido debe ser convertido
a un array de objetos JS, y almacenado en una variable.
Finalmente, integrarás la lógica necesaria en los tres endpoints
creados, para poder:
● listar todos los objetos del array
● devolver un objeto buscando el mismo por su propiedad :id
● devolver uno o más objetos filtrando los mismos por su
propiedad nombre. (puede recibir parte del nombre)
*/

const fs = require('fs').promises;    //Para poder usar async/await debo tener habilitado las promesas de FileSystem
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const { error } = require('console');
    dotenv.config();
const PORT = process.env.PORT || 3004    //Ejecutar en puerto de .env, sino ejecutar en P:3004
const FRUTAS = process.env.FRUTAS_PATH // String - Indica ruta donde leer el set de datos json


async function leerArchivo(ruta) {   // Creo una función asincrona (async /await) - Uso ruta como parametro para poder reutilizar la funcion
    try {
        const data = await fs.readFile(ruta, 'utf-8');   // Se lee el archivo FRUTAS que es de tipo : string 
        const productos = JSON.parse(data); // pasa de string a objeto
        return productos;    // Retorno el array para ser utilizado
    } catch (error) {
        console.error('No se pudo leer el archivo', error);    
        return [];  //retorno un array vacío para no romper el código
    };
};

app.get('/', (req, res) => {
    res.send('<h1>Este es un server con frutas</h1>');
});

app.get('/productos', async (req, res) => {  
    const productos = await leerArchivo(FRUTAS);   
    res.json(productos);

});

app.get('/productos/id/:id', async(req, res) => {
    const id = parseInt(req.params.id);    //Tranformo lo que me llega como string a number
    const frutas = await leerArchivo(FRUTAS);
    const resultado = frutas.find(fruta => fruta.id === id);     //Busco dentro de FRUTAS el id solicitado
        if (resultado === undefined){      //También puedo poner(!resultado) ->osea que resultado es no encontro lo que buscaba
            res.send('<h3>El id solicitado no se encuentra definido - Ingrese otro valor.</h3>')
        } else {
            res.json(resultado); 
        }
});

app.get('/productos/nombre/:nombre', async(req, res) => {
    const item = req.params.nombre.trim().toLowerCase();
    const frutas = await leerArchivo(FRUTAS);
    const resultado = frutas.filter(fruta => fruta.nombre.toLowerCase().includes(item));
        if (resultado.length > 0) { 
            res.send(resultado);
        } else {
            res.send('<h3>El nombre buscado no se encuentra en nuestros registros.</h3>');
        };
});

app.use((req, res) => {
    res.status(404).send('<h1>Ha habido un error - Ruta no encontrada</h1>');
});

app.listen(3003, () => {
    console.log('Servidor iniciado en el puerto 3003');
});
