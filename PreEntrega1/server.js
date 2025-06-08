/* 

Con la estructura base del proyecto ya desarrollada, deberás crear los endpoints necesarios para
listar el catálogo de películas y series por diferentes posibles búsquedas.
Las detallamos en el siguiente slide:
Crea un endpoint llamado /catalogo que liste todo el contenido de trailerix JSON
Crea un endpoint llamado /titulo/:title que liste el catálogo de películas y/o series que se aproxime
al título enviado. (la búsqueda del nombre debe ser parcial)
    Crea un endpoint llamado /categoria/:cat que liste todo el contenido del archivo JSON de acuerdo
a la categoría enviada como parámetro (serie o película)
    Crea un endpoint llamado /reparto/:act que liste el catálogo que incluya a la actriz o actor indicado
por el nombre. (la búsqueda del nombre debe ser parcial)
    Crea un endpoint llamado /trailer/:id que retorne la URL del trailer de la película o serie. Si ésta no
posee video asociado, que retorne un mensaje en formato JSON noticando la no disponibilidad del
mismo.
De acuerdo a lo pedido, te compartimos recomendaciones en el siguiente slide:
1. Para el endpoint /catalogo debes retornar todo el contenido del archivo
2. Para el endpoint /titulo/:title deberás utilizar rutas dinámicas recibiendo como parámetro el título o
parte de este, aplicando la función de orden superior .filter() junto al método
.includes() y el método toUpperCase() o toLowerCase() para normalizar los textos de
búsqueda correspondiente
3. Para el endpoint /categoria/:cat utiliza también .filter() y retorna todos los resultados
encontrados. (Aquí son dos posibles valores solamente)
4. Para el endpoint /reparto/:act aplica también la misma lógica utilizada en el endpoint
/titulo/:title. (Como resultado, retorna solo un array con la propiedad “reparto” y la propiedad
“titulo” y sus respectivos datos (no devuelvas todo el contenido) ¿recuerdas a .map()?
5. Para el endpoint /trailer/:id debes retornar las propiedades “id”, “titulo”, “trailer”. (cuidado, porque
no todas las películas/series poseen la propiedad tráiler, por lo tanto debes aplicar el operador de
acceso condicional {objeto?.trailer} )
*/

const fs = require('fs');
const removeAccents = require('remove-accents');   //Instalar - Remueve acentos 
const express = require('express');
const app = express();
const dotenv = require('dotenv'); //Instalar
    dotenv.config();
const PORT = process.env.PORT || 3009  //Ejecutar en puerto de .env, sino ejecutar en P:3009
const TRAILERFLIX = process.env.FILE_PATH; //Lee el set de datos json

//Lee los objetos del Json, y si no lo puede leer me tira el error
fs.readFile(TRAILERFLIX, 'utf-8', (error, data) => {
    if (error) {
        console.error("No se pudo leer el archivo.", error);
        return;
    }
    setDatos = JSON.parse(data); // Los objetos los manejos desde acá
  });
 
 // Normaliza los parametros recibidos: sin acentos, sin espacios, todo minúscula. - Para facilitar busquedas
  function normalizarParametros(parametro){
    let peticion = removeAccents(parametro.trim().toLowerCase());
    return peticion;
};

app.get('/', (req,res) => {
    res.send('<h1>TrailerFlix</h1> <br> <h3>Una api para buscar series y películas</h3>');
});

// /catalogo que liste todo el contenido de trailerFix JSON
app.get('/catalogo', (req,res) => {
    console.log('Llegue a catalogo');
    res.json(setDatos);
});

/* /categoria/:cat que liste todo el contenido del archivo JSON de acuerdo
a la categoría enviada como parámetro (serie o película) 
    Para el endpoint /categoria/:cat utiliza también .filter() y retorna todos los resultados
encontrados. (Aquí son dos posibles valores solamente)*/
app.get('/categoria/:cat', (req,res) => {
    console.log('Estoy en /categoria/:cat');
    console.log(req.params.cat);
    let peticion = normalizarParametros(req.params.cat); // normalizo los valores ingresados por url
    let resultado = [];
        for (let item of items){
            if (item.categoria.trim().toLowerCase() == peticion) {
            resultado.push(item);
        }
    }
        resultado.length > 0 ?
            res.json(resultado) :
            res.json([{id: 'Error', descripcion: 'No se encuentra la ruta o recurso solicitado'}])
        console.table(resultado); 
})
/* /categoria/:cat que liste todo el contenido del archivo JsON de acuerdo
a la categoría enviada como parámetro (serie o película) */

/* /reparto/:act que liste el catálogo que incluya a la actriz o actor indicado
por el nombre. (la búsqueda del nombre debe ser parcial) */

/* /trailer/:id que retorne la URL del trailer de la película o serie. Si ésta no
posee video asociado, que retorne un mensaje en formato JSON noticando la no disponibilidad del
mismo. */

/*titulo/:title que liste el catálogo de películas y/o series que se aproxime
al título enviado. (la búsqueda del nombre debe ser parcial)*/



// manejo de error por ruta invalida - Global
app.use((req, res) => {
    res.status(404).send({
      error: "404",
      description: "No se encuentró la ruta solicitada."
    });
  });

  // no puede faltar para poder inicializar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
