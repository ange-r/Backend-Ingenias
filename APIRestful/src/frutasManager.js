const fs = require('fs');
const path = require('path');

function leerFrutas() {
    const data = fs.readFileSync(path.join(__dirname, process.env.FRUTAS_DB), 'utf-8');
    return JSON.parse(data);
}

function guardarFrutas(frutas) {
    const datos = JSON.stringify(frutas, null, 2);   // null, para que no sea reemplazable 
                                                     // 2 para que el objeto se vea con interlineado
    fs.writeFileSync(path.join(__dirname, process.env.FRUTAS_DB), datos);   
}

module.exports = { leerFrutas, guardarFrutas };
    