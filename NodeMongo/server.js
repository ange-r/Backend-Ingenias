const express =require('express');
const { connectToMongoDB, disconnectFromMongoDB} = require('./src/mongodb');   //Llamo a las funciones
const app = express();
const PORT = process.env.PORT || 3006


app.use((req, res, next)=> {  
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});


app.get('/', (req, res) => {   
    // Para que no tire el error: SyntaxError: JSON.parse: unexpected character at line 1 column 1 of the JSON data
    // Responder con formato json, como indica el middleware
    res.status(200).json({ mensaje: 'Este es un server con frutas - Usando MongoDB'});
});

app.get('/frutas', async (req, res) => {   //Siempre asincrona
    const client = await connectToMongoDB();    //Conecto
        if (!client) {  //Si cliente no se conecta - False
            res.status(500).json({error: 'Error al conectar con la base de datos'});
            return;
        }
    const db = client.db('BKN');   //Traigo la BaseDeDatos
    const frutas = await db.collection('FrutasDB').find().toArray();   //Traigo l Collección en la BaseDeDatos

    await disconnectFromMongoDB();   //Desconecto - No olvidar
    res.json(frutas);    //Muestro los datos de la Collección
});

app.get('/frutas/nombre/:nombre', async (req, res) => {
    const nombreFr = req.params.nombre.trim().toLowerCase();
    if(!nombreFr){
        res.status(400).json({error: 'Datos ingresados inválidos para la búsqueda'});
        return;
    }
        //Agregar chequeo de ingreso de números, pues si no me arroja el ultimo chequeo 

    const client = await connectToMongoDB();
        if (!client) {
            res.status(500).json({error:'Error al conectar con la base de datos'});
            return;
        }  
    const db = client.db('BKN');
    const resultado = await db.collection('FrutasDB').find({nombre : {$regex: nombreFr, $options: 'i'}}).toArray();   
    // El findOne ({ usar siempre este formato de array })   -    //La 'i' es para volver la busqueda en Mongo insensible a mayus/minus

    await disconnectFromMongoDB();
    //Chequeo si hay frutas
    if (resultado.length === 0){
        res.json({mensaje: 'La búsqueda no arroja resultados - Intentelo con otra fruta'});
        return;
    }
        res.json(resultado);
});

app.get('/frutas/id/:id', async (req, res) => {
    //El parametro de la peticion lo convierto a number
    const frutaId = parseInt(req.params.id);    
        //Chequeo que el parametro enviado sea un número y no otro tipo
        if (isNaN(frutaId)) {  
            res.status(400).json({ error: 'El ID debe ser un número válido' });
            return;
        }
    const client = await connectToMongoDB();    
        if (!client) {  
            res.status(500).json({error: 'Error al conectar con la base de datos'});
            return;
        }
    const db = client.db('BKN');   //Entro a la DB
    //Busco la peticion por ID
    const resultado = await db.collection('FrutasDB').find({id : frutaId}).toArray();   

    await disconnectFromMongoDB();
    //Chequeo que el ID ingresado exista
    if (resultado.length === 0) {
        res.status(404).json({error: 'Ha habido un error - ID inexistente'});
        return;
    }
    //Chequeo que no haya ID repetidos - Si hay los muestro para poder corregir
    //Cambiar el tipo de chequeo, no puede haber id repetidos nunca
    if (resultado.length > 1) {
        res.json({mensaje: 'IMPORTANTE! Se encontraron objetos con ID duplicado', resultado});
        return;
    };
    res.json(resultado);
});

app.get('/frutas/importe/:importe', async(req, res) => {
    const importe = parseInt(req.params.importe);
        if (isNaN(importe)) {  
            res.status(400).json({ error: 'El importe debe ser un número válido' });
            return;
        }
    const client = await connectToMongoDB();
        /*if (!client) {
            res.status(500).json({error: 'Error al conectar con la base de datos'});
        return;
        };*/
    const db =client.db('BKN');
    const resultado = await db.collection('FrutasDB').find({importe : {$gte : importe}}).toArray();

    await disconnectFromMongoDB();
    //Chequeo que haya items con los importes solicitados
        if (resultado.length === 0){
            res.json({mensaje: 'No se encontraron resultados para tu busqueda'});
            return;
        }
    res.json(resultado);
});

app.post('/frutas', async (req, res) => {
    const nuevaFruta = req.body;
        if (nuevaFruta === undefined){
            res.status(400).json({error: 'Error en el formato de datos a crear'});
            return;
        }
    const client = await connectToMongoDB();
        
})

app.use((req, res) => {    // Responder con formato json, como indica el middleware
    res.status(404).json({ error: 'Ha habido un error - Ruta no encontrada' });
});

app.listen(3005, () => {
    console.log('Servidor iniciado en el puerto ', 3005);
});
