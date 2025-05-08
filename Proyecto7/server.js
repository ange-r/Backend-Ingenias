/*
En el servidor web debemos definir las siguientes rutas:
1. “/curso/codigo/:id”
2. “/curso/nombre/:nombre”
1. El código de curso debe recibir un parámetro numérico. Convertimos al mismo
en un valor numérico utilizando parseInt(), verificamos que así sea utilizando
typeof y finalmente buscamos el curso en cuestión iterando el array. Cuando
encontramos el mismo, lo agregamos al array resultado y lo retornamos como
respuesta interrumpiendo la posible continuidad de una iteración innecesaria.
1. Cuando buscamos por nombre, la búsqueda deberá ser parcial, o sea, que se
pueda enviar parte del nombre del curso. El endpoint podrá devolver uno o
más cursos resultantes.
*/
const express = require('express');
const app = express();
const cursos = require('./data/cursos.json');
const PORT = 3003


app.get('/', (req, res) => { 
    res.send('<h1>Servidor con rutas dinámicas</h1><br><h2 Ruta raíz</h2>');
});

app.get('/cursos', (req, res) => { 
    res.json(cursos);
    console.table(cursos);
});

// Para hacer peticiones modo URLparams (parametros simples)
app.get('/cursos/:categoria', (req, res) => { 
    console.log(req.params.categoria);
    let parametro = req.params.categoria.trim().toLowerCase();
    let resultado = [];
        for (let curso of cursos){
            if (curso.categoria.trim().toLowerCase() == parametro) {
            resultado.push(curso)
        }
    }
        resultado.length > 0 ?
            res.json(resultado) :
            res.json([{id: 'Error', descripcion: 'No se encuentra la ruta o recurso solicitado'}])
        console.table(resultado);        
});
// Buscar por ID, usando parseInt() para convertir el parametro a numbre y typeof para corroborar que sea number
app.get('/cursos/codigo/:id', (req,res) => {
    let id = parseInt(req.params.id);
    if (typeof id !== 'number' || isNaN(id)) {
        res.send('El id ingresado es inexistente');
    };

    let resultado = [];
        for (let curso of cursos) {
            if (curso.id === id ) {
                resultado.push(curso); 
            }
        }
    console.table(resultado);
    res.json(resultado);
});
// Buscar por nombre (busqueda parcial) y que devuelva todas los posibles cursos
app.get('/cursos/nombre/:nombre', (req,res) => {
    let parametro = req.params.nombre.trim().toLowerCase();
    if (parametro !== "") {
        let resultado = [];
            for (let curso of cursos) {
                if (curso.nombre.trim().toLowerCase().includes(parametro)){
                resultado.push(curso);
                }
            }
        res.json(resultado);
    } 
});
/*
// Para peticionar QueryParams (parametros compuestos)    Sigue pag 50
app.get('/cursos', (req,res) => {
    const queryParams = Object.keys(req.query);
    if (queryParams.length === 0) {
        console.log('No llegan parámétros. Envío set de datos');
        res.send('No llegan parámetros');    
    } else {
        console.log('Llegan parámetros.');
    }
    const nombre = req.query.nombre?.trim().toLowerCase() || "";
    const categoria = req.query.categoria?.trim().toLowerCase() || "";

    let resultado = [];
    for (let curso of cursos){
        if ((curso.nombre.toLowerCase().includes(nombre)) && (curso.categoria.toLowerCase().includes(categoria))){
            resultado.push(curso);
        }  
    }
    resultado.length > 0 ?
            res.json(resultado) :
            res.json([{id: 'Error', descripcion: 'No se encuentra la ruta o recurso solicitado'}])
        console.table(resultado);
});
 */

app.use((req, res) => {
    res.status(404).json({
        error: "404",
        description: "No se encuentra la ruta o recurso solicitado"
    })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto 3003`);
  });
  
