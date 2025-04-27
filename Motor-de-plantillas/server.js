const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // usa path para que siempre funcione bien la ruta

app.get('/', (req, res) => {
    const data = {
        title: 'Web con Motor de Plantillas',
        message:'Primer prueba con plantillas',
    };
    res.render('index', data);
})

app.use((req, res) => {
    res.status(404).json({
        error: "404",
        description: "Nose encuentra la ruta o recurso solicitado"
    })
})

app.listen(3001, () => {
    console.log('Servidor iniciado en puerto 3001');
})
