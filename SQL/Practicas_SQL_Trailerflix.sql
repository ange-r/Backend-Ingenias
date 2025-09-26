select titulo, id, poster, resumen, trailers from Titulos t;

-- >> Muestra Titulos cuando coinciden tags y titulos (Hay duplicados/triplicados)
select t.titulo as Titulo, t.id as ID, t.poster as Poster, t.resumen as Resumen, t.trailers as URL from Titulos t
join TagsTitulos tg
on t.id = tg.titulos_id;

select t.titulo as Titulo, t.id as ID, t.poster as Poster, t.resumen as Resumen, t.trailers as URL from Titulos t
inner join TagsTitulos tg
on t.id = tg.titulos_id;
 
select t.titulo as Titulo, t.id as ID, t.poster as Poster, t.resumen as Resumen, t.trailers as URL from Titulos t
left join TagsTitulos tg    -- (trae todos los datos de la Tabla de mas peso (Titulos))
on t.id = tg.titulos_id;

select t.titulo as Titulo, t.id as ID, t.poster as Poster, t.resumen as Resumen, t.trailers as URL from Titulos t
right join TagsTitulos tg	-- (trae todos los datos de la Tabla de menos peso (Titulos))
on t.id = tg.titulos_id;

-- Cómo traer solo 1 fila por título
-- DISTINCT (si no te importa perder la info de los tags): select distinct t.id, t.titulo, t.poster, t.resumen, t.trailers from Titulos t join TagsTitulos tg on t.id = tg.titulos_id;
-- GROUP BY (para forzar 1 fila por título): select t.id, t.titulo, t.poster, t.resumen, t.trailers from Titulos t join TagsTitulos tg on t.id = tg.titulos_id group by t.id, t.titulo, t.poster, t.resumen, t.trailers;
-- Concatenar los tags (la más linda, porque ves todos los tags en una sola fila): select t.id, t.titulo, t.poster, t.resumen, t.trailers, group_concat(tag separator ', ') as tags from Titulos t join TagsTitulos tg on t.id = tg.titulos_id join Tags g on g.id = tg.tags_id group by t.id, t.titulo, t.poster, t.resumen, t.trailers;

-- >> Obtener una lista de películas por género (por ejemplo: "Acción", "Terror", "Suspenso").
select 
    t.id, 
    t.titulo, 
    t.poster, 
    t.resumen,
    g.tag as tag,   -- Muestra solo 1 tag alfab asc
    t.trailers
from Titulos t
join TagsTitulos tg on t.id = tg.titulos_id
join Tags g on g.id = tg.tags_id
-- where g.tag = 'Acción';
where g.tag in ('Acción', 'Terror', 'Suspenso');

-- >> Para ver los tags conactenados en la misma linea
select t.id, t.titulo, group_concat(g.tag separator ', ') as generos from Titulos t
join TagsTitulos tg on t.id = tg.titulos_id
join Tags g on g.id = tg.tags_id
group by t.id, t.titulo;

-- >> Obtener películas con los tags "Aventura" y "Ciencia Ficción", o "Aventura" y "Fantasía".
select t.titulos as Titulo, group_concat(tg.tag separator ', ') as Tags from Titulos t
join TagsTitulos tgt on t.id = tgt.titulos_id
join Tags tg on tg.id = tgt.tags_id
where tg.tag in ('Aventura' && 'Ciencia Ficción'); -- Esto es lo que pense yo, pero no funciona

select t.titulo as Titulo, group_concat(distinct tg.tag separator ', ') as Tags
from Titulos t
join TagsTitulos tgt on t.id = tgt.titulos_id
join Tags tg on tg.id = tgt.tags_id
where tg.tag in ('Aventura', 'Ciencia Ficción')   -- Trae todos los titulos que tengan alguno de estos tag
group by t.id, t.titulo   -- Agrupa los resultados por titulo
having count(distinct tg.tag) = 2;      -- Chequea que el resultado anterios si o si tenga 2 tag distintos 

-- Visualizar títulos y categorías cuyo resumen contenga la palabra "misión".
Select t.titulo as Titulo, c.categoria as Categoria 
from Titulos t 
join Categoria c on t.categoria_id = c.id
where lower(t.resumen) like '%misión%'
group by t.titulo, c.categoria;

-- Listar las series con al menos 3 temporadas.
select t.titulo as Titulo, t.temporadas as Temporadas
from Titulos t 
where t.temporadas > 2;

-- Contar cuántas películas/series trabajó el actor Chris Pratt.
select count(distinct t.titulo) as CantTitulos from Titulos t     -- Agregar Distint para que no cuente repetidos
join Reparto r on t.id = r.titulos_id
join Actores a on r.actores_id = a.id
where lower(trim(a.nombreCompleto)) = 'Chris Pratt';    -- Ignora mayusculas y espacios NOrmalización

-- Mostrar nombre completo de actrices/actores junto a: título de los trabajos, categoría y género.
select a.nombreCompleto as Actriz_Actor, t.titulo as Titulo, c.categoria as Categoria, g.genero as Genero
-- group_concat(distinct g.genero order by g.genero separator ', ') as Generos     -- Esto seria para ver los generos separados por , pero no funcionó  
from Actores a
join Reparto r on a.id = r.actores_id
join Titulos t on t.id = r.titulos_id
join Categoria c on c.id = t.categoria_id 
join Genero g on g.id = t.genero_id;

-- Aca pedi ayuda a IA para poder mostrar cada actriz/actor c sus titulos y estos con sus generos
select a.nombreCompleto as Actriz_Actor,
group_concat(distinct concat(titulos.titulo, ' (', titulos.generos, ')') order by titulos.titulo separator '; ') as Trabajos
from Actores a
join Reparto r on r.actores_id = a.id
join (select t.id, t.titulo, group_concat(distinct g.genero order by g.genero separator ', ') as Generos
    from Titulos t
    join Genero g on g.id = t.genero_id
    group by t.id, t.titulo) titulos on titulos.id = r.titulos_id
group by a.id, a.nombreCompleto;

-- Ver solo la categoría "Películas": mostrar título en mayúsculas, género en mayúsculas, tags separados por coma, duración y enlace al tráiler.
select upper(t.titulo) as Titulo, upper(g.genero) as Generos, group_concat(distinct tg.tag separator ', ') as Tags, t.duracion as Duracion, t.trailers as Trailer
from Titulos t 
join Genero g on g.id = t.genero_id
join Categoria c on c.id = t.categoria_id
join TagsTitulos tt on tt.titulos_id = t.id
join Tags tg on tg.id = tt.tags_id
where c.categoria = 'Pelicula'
group by t.titulo, t.genero_id, t.duracion, t.trailers;

-- Ver solo la categoría "Series": mostrar título en mayúsculas, género en mayúsculas, tags separados por coma, cantidad de temporadas, tráiler y resumen.
select upper(t.titulo) as Titulo, upper(g.genero) as Generos, group_concat(distinct tg.tag separator ', ') as Tags, t.temporadas as Temporadas, t.trailers as Trailer, t.resumen as Resumen
from Titulos t 
join Genero g on g.id = t.genero_id
join Categoria c on c.id = t.categoria_id
join TagsTitulos tt on tt.titulos_id = t.id
join Tags tg on tg.id = tt.tags_id
where c.categoria = 'Serie'
group by t.titulo, t.genero_id, t.temporadas, t.trailers, t.resumen;

-- Identificar la película/serie con más actores y la que tiene menos actores, indicando la cantidad en cada caso.
-- Maximo
select t.titulo as Titulo, c.categoria as Categoria, count(r.actores_id) as CantActores
from Titulos t 
join Categoria c on t.categoria_id = c.id
join Reparto r on t.id = r.titulos_id
where c.categoria in ('Película', 'Serie')
group by t.id, t.categoria_id
order by CantActores desc limit 1; -- Minimo cambiar ASC

-- Forma correcta
select max(CantActores) as RepartoMaximo, min(CantActores) as RepartoMinimo
from (
select t.titulo as Titulo, c.categoria as Categoria, count(r.actores_id) as CantActores
from Titulos t 
join Categoria c on t.categoria_id = c.id
join Reparto r on t.id = r.titulos_id
where c.categoria in ('Película', 'Serie')
group by t.titulo, t.categoria_id
) as SubConsulta;  -- Una subconsulta siempre lleva Alias

-- Contar la cantidad total de películas registradas.
select count(t.id) as TotalPeliculas,  c.categoria as Categoria  -- count() siempre debe tener una variable númerica, por eso uso id
from Titulos t 
join Categoria c on t.categoria_id = c.id
where c.categoria in ('Película')
union
-- Contar la cantidad total de series registradas.
select count(t.id) as TotalPeliculas,  c.categoria as Categoria
from Titulos t 
join Categoria c on t.categoria_id = c.id
where c.categoria in ('Serie');

-- Listar las series en orden descendente por cantidad de temporadas.
Select t.titulo as Titulo, c.categoria as Categoria, t.temporadas as Temporadas 
from Titulos t 
join Categoria c on t.categoria_id = c.id
where c.categoria in ('Serie')
order by t.temporadas desc;

-- Agregar el campo fecha_lanzamiento (tipo DATE) a la tabla de trabajos fílmicos y actualizar las fechas de los títulos del género "Aventura".
alter table Titulos 
add column fecha_lanzamiento Date;

update Titulos t 
join Genero g on t.genero_id = g.id
set t.fecha_lanzamiento = '2025-12-06'
where g.genero = 'Aventura'
and t.id = 75;  -- Al seteo de las fechas para titulos de Aventura, le sumo el seteo segun su ID

-- Buscar películas por palabra clave en título o descripción (por ejemplo: "Aventura", "madre", "Ambientada").
Select t.titulo as Pelicula, t.resumen as Resumen from Titulos t
WHERE t.titulo LIKE '%Aventura%'
   OR t.resumen LIKE '%Aventura%'
   OR t.titulo LIKE '%madre%'
   OR t.resumen LIKE '%madre%'
   OR t.titulo LIKE '%Ambientada%'
   OR t.resumen LIKE '%Ambientada%';

-- Agregar una tabla "Ranking" con:
-- ID de película/serie, calificación y comentarios.
CREATE TABLE IF NOT EXISTS `Ranking` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`titulo_id` int NOT NULL,
	`calificacion` int NOT NULL,
	`comentarios` varchar(250) NOT NULL,
	PRIMARY KEY (`id`)
);
ALTER TABLE `Ranking` ADD CONSTRAINT `Ranking_fk1` FOREIGN KEY (`titulo_id`) REFERENCES `Titulos`(`id`);
