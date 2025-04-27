const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Esta es LA raíz</h1>');
});
app.get('/cursos', (req, res) => {
    res.send('<h1>Esta es la page CURSOS</h1>');
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
        description: "Nose encuentra la ruta o recurso solicitado"
    })
})

app.listen(3050, () => {
    console.log('Servidor iniciado en el puerto 3050');
});