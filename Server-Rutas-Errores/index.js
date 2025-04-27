const http = require('http');
const port = 3008;
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200; // status 200 = OK
        res.setHeader ('Content-Type', 'text/html');
        res.end('<h1> Estas en el INICIO </h1>');
    } else if (req.url === '/cursos') {
        res.statusCode = 200; // status 200 = OK
        res.setHeader ('Content-Type', 'text/html');
        res.end('<h1> Estas viendo los CURSOS </h1>');
    } else if (req.url === '/contacto') {
        res.statusCode = 200; // status 200 = OK
        res.setHeader ('Content-Type', 'text/html');
        res.end('<h1> Estas en CONTACTO </h1>');
    } else {
        res.statusCode = 404; // status 404 = Recurso no encontrado
        res.setHeader ('Content-Type', 'text/plain');
        res.end('ERROR Ruta inexistente');
    }
})

server.listen(port, () => {
    console.log(`Servidor ejecutandose en el puerto> ${port}`);
})
