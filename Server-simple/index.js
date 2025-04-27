const http = require('http');
const port = 3000

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader ('Content-Type', 'text/plain');
    response.end ('Hola, domun!');
})

server.listen(port, () => { 
console.log(`Servidor ejecutándose en el puerto: ${port}`);
console.log("Hola este es mi primer proyecto Backend");
})

