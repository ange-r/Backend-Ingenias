const express = require('express');
const app = express();
const { connectToMongoDB, disconnectFromMongoDB } = require('./src/database/mongoDB');
const PORT = process.env.PORT || 3001
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb'); //Para poder hacer la busqueda por id

app.use((req, res, next) => {
    res.header("content-Type", "application/json; charset=utf-8");
    next();
});
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.status(200).json({mensaje: 'Página principal SUPERMERCADO'});
});

//Get: Supermercado - Catálogo muestra todos los objetos
app.get('/supermercado', async(req, res) => {
    const client = await connectToMongoDB();   
        if (!client) {  
            res.status(500).json({error: 'Error al conectar con la base de datos'});
            return;
        }
    const db = client.db('BKN');   
    const catalogo = await db.collection('Supermercado').find().toArray();  
    await disconnectFromMongoDB();   
    // Ordenar por código (ascendente)
        catalogo.sort((a, b) => a.codigo - b.codigo);
    res.json(catalogo);    
});

//Get: Codigo - Muestra objetos según código peticionado (búsqueda exacta)
app.get('/supermercado/codigo/:codigo', async(req, res) => {
    const codigoArt = parseInt(req.params.codigo);
        if (codigoArt < 999 || isNaN(codigoArt)) {  //Controlo que se ingrese un número y de 4 dígitos
            res.status(400).json({ error: 'El codigo debe ser un número válido, de 4 dígitos' });
            return;
        }
    const client = await connectToMongoDB();   
        if (!client) {  
            res.status(500).json({error: 'Error al conectar con la base de datos'});
            return;
        }
    const db = client.db('BKN');   
    const respuesta = await db.collection('Supermercado').find({codigo : codigoArt}).toArray();  
    await disconnectFromMongoDB();  
        if (respuesta.length === 0){
            res.status(404).json({mensaje: 'No se ha encontrado artículo con el código solicitado'});
        } 
    res.json(respuesta);    
});

//Get: Nombre - Busca objetos por nombre (búsqueda parcial - por letra inicial)
app.get('/supermercado/nombre/:nombre', async(req, res) => {
    const nombreArt = req.params.nombre.trim().toLocaleLowerCase();
    const client = await connectToMongoDB();   
        if (!client) {  
            res.status(500).json({error: 'Error al conectar con la base de datos'});
            return;
        }
    const db = client.db('BKN');   
    const respuesta = await db.collection('Supermercado').find({nombre : {$regex: `^${nombreArt}`, $options: 'i'}}).sort({ nombre: 1 }).toArray();  
    // Ordenar por código (ascendente)
    await disconnectFromMongoDB();  
        if (respuesta.length === 0){
            res.status(204).json({mensaje: 'No se ha encontrado artículo con el nombre solicitado'});
        } 
    res.json(respuesta);    
});

//Get: Precio - Busca objetos por precio (búsqueda igual o mayor a)
app.get('/supermercado/precio/:precio', async(req, res) => {
    const precioArt = parseFloat(req.params.precio);
        if (isNaN(precioArt)) {  
            res.status(400).json({ error: 'El importe debe ser un número válido' });
            return;
        }
    const client = await connectToMongoDB();   
        if (!client) {  
            res.status(500).json({error: 'Error al conectar con la base de datos'});
            return;
        }
    const db = client.db('BKN');   
    const respuesta = await db.collection('Supermercado').find({precio : {$gte : precioArt}}).toArray();  
    await disconnectFromMongoDB();  
        if (respuesta.length === 0){
            res.status(404).json({mensaje: 'No se han encontrado artículos con el precio solicitado'});
        } 
    res.json(respuesta);    
});

//Get: Categoria - Busca objetos por categoria (búsqueda parcial) -MEJORAR
app.get('/supermercado/categoria/:categoria', async(req, res) => {
    const categoria = req.params.categoria;
    const client = await connectToMongoDB();   
        if (!client) {  
            res.status(500).json({error: 'Error al conectar con la base de datos'});
            return;
        }
    const db = client.db('BKN');   
    const respuesta = await db.collection('Supermercado').find({categoria : {$regex : categoria}}).toArray();  
    await disconnectFromMongoDB();  
        if (respuesta.length === 0){
            res.status(404).json({mensaje: 'No se han encontrado artículos para la categoria solicitada'});
        } 
    res.json(respuesta);    
});

//POST: Agregar articulos al catalogo
app.post('/supermercado', async (req, res) => {
    const nuevoArt = req.body;
        if (nuevoArt === undefined){
            res.status(400).json({error: 'Error en el formato de datos a crear'});
            return;
        }
    const client = await connectToMongoDB();
        if (!client){
            res.status(500).json({error: 'Error al conectar con la base de datos'});
            return;
        }
    const catalogo =client.db('BKN').collection('Supermercado');
        catalogo.insertOne(nuevoArt)
        .then(() => {
            res.status(201).json({mensaje: 'Nuevo Artículo creado', nuevoArt});
        })
        .catch(error => {
            res.json({error: 'Ha habido un error al intentar cargar el artículo'});
        })
        .finally(() => {
            disconnectFromMongoDB();
        });
});

//PUT: Actualizar datos en catálogo, 
app.put('/supermercado/:id', async(req, res) => {
    const id = new ObjectId(req.params.id);
        if (!id) {  
            res.status(400).json({ error: 'El ID ingresado no es válido.' });
            return;
        }
    const nuevosDatos = req.body;
        if (!nuevosDatos) {
            res.status(500).json({error: 'Error en el formato recibido'})
        }
    const client = await connectToMongoDB();
        if (!client){
            res.status(500).json({error: 'Error al conectar con la base de datos'});
            return;
        }
    const catalogo = client.db('BKN').collection('Supermercado');
    //Chequeo que los datos sean del tipo correcto
   
    producto = { }
    log = { }

        if (nuevosDatos.nombre) {
            if (typeof nuevosDatos.nombre === 'string') {
                producto.nombre = nuevosDatos.nombre;
                log.nombre = `Se modifico el nombre del producto: ${producto.nombre}`;
            }
            else {
                log.nombre = "El nombre del producto tiene que ser una cadena de caracteres valida";
            }
        }   

        if (nuevosDatos.categoria) {
            if (typeof nuevosDatos.categoria === 'string') {
                producto.categoria = nuevosDatos.categoria;
                log.categoria = `Se modifico la categoria del producto: ${producto.categoria}`;
            }
            else {
                log.categoria = "La categoria del producto tiene que ser una cadena de caracteres valida";
            }
        }   

        if ((nuevosDatos.precio || nuevosDatos.precio === 0) && (typeof nuevosDatos.precio === 'number' && nuevosDatos.precio >= 0)) {
            producto.precio = nuevosDatos.precio;
            log.precio = `Se modifico el precio del producto: ${producto.precio}`;
        } else {
            log.precio = "El valor de precio tiene que ser un numero mayor o igual a 0";
        }

    catalogo.updateOne({_id : id}, {$set : nuevosDatos})
        .then((resultado) => {
            if (resultado.matchedCount === 0) {
            res.status(404).send(`No se encontro producto con el ID proporcionado: ${id}`);
            } else {
            console.log('Producto modificado');
            res.status(200).send(log);
            }
        })
        .catch(error => {
            res.json({error: 'Ha ocurrido un error al intentar actualizar los datos'});
        })
        .finally(() => {
            disconnectFromMongoDB();
        });
});

//DELETE: Eliminar elementos del catálago por código
app.delete('/supermercado/:codigo', async (req, res) => {
    const codArt = parseInt(req.params.codigo);
        if (isNaN(codArt)) {  
            res.status(400).json({ error: 'El codigo debe ser un número válido' });
            return;
        }
    const client = await connectToMongoDB();
        if (!client){
            res.status(500).json({error: 'Error al conectar con la base de datos'});
            return;
        }
    client.connect()
    .then(() => {
        const catalogo = client.db('BKN').collection('Supermercado');    
        return catalogo.deleteOne({codigo : codArt});
    })
    .then((resultado) => {
        if (resultado.deletedCount === 0) {
            res.status(404).json({error: 'No se ha encontrado el código solcitado', codArt});
        } else {
            console.log('Artículo eliminado')
            res.status(204).json({mensaje:'Artículo eliminado con exito'});
        }
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        disconnectFromMongoDB();
    });
});


//DELETE: Eliminar elementos del catálago por _id
app.delete('/supermercado/_id/:id', async (req, res) => {
    const id = new ObjectId(req.params.id);
        //transformo id en un nuevo objetoId (para que Mongo me tome la petición)
        if (!ObjectId.isValid(id)) {
            res.status(400).json({error: 'ID inválido'});
            return;
        }
    const client = await connectToMongoDB();
        if (!client){
            res.status(500).json({error: 'Error al conectar con la base de datos'});
            return;
        }
    client.connect()
    .then(() => {
        const catalogo = client.db('BKN').collection('Supermercado');    
        return catalogo.deleteOne({ _id : id}); 
    })
    .then((resultado) => {
        if (resultado.deletedCount === 0) {
            res.status(404).json({error: 'No se ha encontrado el ID solcitado'});
        } else {
            console.log('Artículo eliminado')
            res.status(204).json({mensaje:'Artículo eliminado con exito'});
        }
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        disconnectFromMongoDB();
    });
});


app.use((req, res) => {    
    res.status(404).json({ error: 'Ha habido un error - Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en PUERTO:${PORT}`);
});
