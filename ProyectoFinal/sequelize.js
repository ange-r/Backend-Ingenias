const sequelize = require('sequelize');

// Instancio Sequelize
const SeqDB = new sequelize(process.env.SEQUELICE_DB, {
    host: "localhost",
    dialect: "mysql",
    dialectOptions: {options: {encrypt : true}},
    define: {timestamps: false}
});

// Método CONEXIÓN
async function authenticate() {
    try {
        await SeqDB.authenticate();
        console.log('Conexión a la DB establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar con la DB', error);
    }
};

// Método  DESCONEXIÓN
async function closeConnection() {
    try {
        await SeqDB.close();
        console.log('Conexión cerrada correctamente.');
    } catch(error) {
        console.error('Erros al desconectar la DB', error);
    }
};
