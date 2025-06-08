const dotenv = require('dotenv');
    dotenv.config();

const { MongoClient } = require('mongodb');

const URI = process.env.MONGODB_URLSTRING;   //Traigo la info del env
const client = new MongoClient(URI);   //instancio el cliente

async function connectToMongoDB() {     //Siempre tiene que ser asincronas
    try {
        await client.connect();     //Conecto
            console.log('Conectado a MongoDB');
        return client;
    } catch (error) {
            console.log('Error al conectar on MongoDB', error);
        return null;
    }
}

async function disconnectFromMongoDB() {
    try {
        await client.close();    //Desconecto
            console.log('Desconectado a MongoDB');
    } catch (error) {
            console.log('Error al desconectar on MongoDB', error);
    }
}
 
module.exports = { connectToMongoDB, disconnectFromMongoDB };  //Para poder conectar desde el servidor - NO OLVIDAR