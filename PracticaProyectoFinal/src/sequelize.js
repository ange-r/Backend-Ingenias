const express = require('express').prom;
const dotenv = require('dotenv');
    dotenv.config();
const { Sequelize } = require('sequelize'); // La constante siempre entre llaves

// Sequelizese refiere a la propia biblioteca,
// mientras sequelizese refiere a un caso de Sequelize, 
// que representa una conexión a una base de datos. 
// Esta es la convención recomendada.

// Instancio Sequelize - Esta conexión al final debo exportarla para poder trabajar 
const seqDB = new Sequelize('Northwind', 'root', ' myFirstDB_2025!', { 
    host: "localhost",
    dialect: "mysql",
    dialectOptions: {options: {encrypt : true}},
    define: {timestamps: false} // Para grabar tiempo en que conecta y desconecta
});

// Método CONEXIÓN
async function conectar() {
    try {
        await seqDB.authenticate();
        console.log('Conexión a la DB establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar con la DB', error);
    }
};

// Método  DESCONEXIÓN
async function desconectar() {
    try {
        await seqDB.close();
        console.log('Conexión cerrada correctamente.');
    } catch(error) {
        console.error('Erros al desconectar la DB', error);
    }
};

module.exports = { seqDB, conectar, desconectar };