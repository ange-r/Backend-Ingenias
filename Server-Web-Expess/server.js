const express = require('express');
const app = express();

const cursos = [
    {id: 1, nombre: "Desarrollo Frontend", categoria: "Programacion"},
    {id: 2, nombre: "Desarrollo Backend", categoria: "Programacion"},
    {id: 3, nombre: "Data Analist", categoria: "Datos"},
    {id: 4, nombre: "Project Manager", categoria: "Management"},
    {id: 5, nombre: "QA Tester", categoria: "Programacion"},
    {id: 6, nombre: "SQL", categoria: "Datos"},
]

app.get('/', (req, res) => {
    res.send('<h1>Esta es LA raíz</h1>');
});
app.get('/cursos', (req, res) => {
    res.send('<h1>Esta es la page CURSOS</h1>');
    console.table(cursos);
});
app.get('/contacto', (req, res) => {
    res.send('<h1>Esta es la page CONTACO</h1>');
});
/*app.use((req, res) => {
    res.status(404).send('<h1>Ha habido un error - Ruta no encontrada</h1>');
});*/
app.use((req, res) => {
    res.status(404).json({
        error: "404",
        description: "No se encuentra la ruta o recurso solicitado"
    })
})

app.listen(3050, () => {
    console.log('Servidor iniciado en el puerto 3050');
});