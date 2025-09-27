const express = require('express').prom;
const dotenv = require('dotenv');
    dotenv.config();
const { Sequelize } = require('sequelize'); // La constante siempre entre llaves

// 'Sequelize' se refiere a la propia biblioteca
// Mientras 'sequelize' se refiere a un caso de Sequelize, 
// que representa una conexión a una base de datos. 
// Esta es la convención recomendada.

// Instancio Sequelize - Esta conexión al final debo exportarla para poder trabajar 
const seqDB = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, { 
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
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