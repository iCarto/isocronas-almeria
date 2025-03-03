# Borrador: Categorización de los POIs

## Introducción

Este documento presenta consideraciones a tener en cuenta a la hora de categorizar los POIs.

### Definiciones

-   Categoría: Un punto pertenecerá únicamente a una categoría. Las categorías son fijas. ie: Salud.
-   Subcategoría: Un punto pertenecerá únicamente a una subcategoría. Una subcategoría estará dentro de una categoría. Las subcategorías son fijas. ie: Dentro de Salud, se puede tener Farmacias, Hospitales, ...
-   Etiquetas: Un punto puede tener tantas etiquetas cómo se quiera. Las etiquetas pueden ser fijas, o crearse dinámicamente.

## Objetivo de la categorización

Categorizar los puntos responde a dos usos:

-   Poder establecer una simbología basada en la categoría en el visor. Aunque la simbología final será decidida después de hacer pruebas.
-   Poder filtrar los puntos de interés en base a su categoría.

Por ello el número de categorías debería moverse entre 5 y 15. Muchas categorías dificulta la comprensión de los datos. Se evitará el uso de subcategorías, porqué serán difíciles de aplicar en una primera versión de los datos. Y se evitará el uso de etiquetas porqué puede complicar la simbología y el filtrado.

## Cómo realizar la categorización

Los datos actuales tienen una columna de "Ámbito" y otra de "Categorías / Descripción" que se podrían usar cómo base, pero no están normalizadas ni validadas.

Qué el equipo consultor sepa, no existe una forma oficial de categorizar POIs aplicable al contexto de este visor. Cada institución (o normativa) aplica distintos criterios de clasificación que tienen sentido para su ámbito de actuación. Así por ejemplo en la EIEL tendremos capas independientes cómo "CASAS CON USO", donde algunas de las categorías que se le asignan son "ALMACENES", "ADMINISTRATIVO MUNICIPAL", "OCIO Y CAFETERIA", "SANITARIO", "MUSEO", "CINE O TEATRO", ... y tendremos otra capa cómo "CENTROS DE ENSEÑANZA" o "CENTROS CULTURALES" cada una con sus subcategorías.

Se debe por tanto hacer un pequeño análisis de las posibles fuentes oficiales o privadas para hacer una categorización lo más cercana posible a una existente, sin perder el foco, en que este visor está muy enfocado a la ciudadanía que no siempre maneja los mismos términos que los estamentos oficiales.

Una vez decididas las categoría estas deben asignarse a los puntos de la forma más automática posible, para hacer una revisión manual a posteriori.

## Propuesta de clasificación

En base a las fuentes de categoría analizadas que se listan en secciones posteriores, las etiquetas existentes y con la ayuda de un LLM se hace una primera propuesta de clasificación. Está en el límite de 15 categorías propuesto:

-   "Finanzas": ["agencia de préstamos", "banco de inversión", "caja de ahorros", "financiero banco", "institución financiera"]
-   "Salud y bienestar": ["hospital", "clínica", "farmacia", "centro de salud", "gimnasio", "spa"]
-   "Alimentación y bebidas": ["restaurante", "cafetería", "bar", "supermercado", "panadería"]
-   "Compras": ["tienda", "centro comercial", "mercado", "ferretería"]
-   "Entretenimiento y ocio": ["cine", "teatro", "museo", "parque de atracciones"]
-   "Cultura y educación": ["biblioteca", "escuela", "universidad", "academia"]
-   "Gobierno e instituciones": ["ayuntamiento", "embajada", "juzgado", "comisaría"]
-   "Transporte": ["estación de tren", "parada de autobús", "aeropuerto", "puerto"]
-   "Alojamiento": ["hotel", "hostal", "apartamento turístico"]
-   "Lugares de culto": ["iglesia", "mezquita", "sinagoga", "templo"]
-   "Espacios naturales": ["parque", "reserva natural", "playa", "montaña"]
-   "Automoción": ["taller mecánico", "gasolinera", "concesionario de coches"]
-   "Servicios": ["peluquería", "lavandería", "agencia de viajes", "asesoría"]
-   "Deportes": ["campo de fútbol", "pista de tenis", "polideportivo"]
-   "Turismo": ["monumento", "punto de información turística", "museo"]

## Posibles fuentes para la categorización de los datos

### Los propios datos

La primera fuente a emplear para establecer las categorías son los propios datos. En la hoja de cálculo anexa hay una primera iteración de los términos que se están usando y que se puede usar cómo punto de partida.

### EIEL

La EIEL (Encuesta de Infraestructuras y Equipamientos Locales) la hacen las diputaciones para todos los municipios menores de 50.000 habitantes. En ella se recoge información de abastecimiento, carreteras, servicios, ...

Es una fuente de datos útil, porqué debería realizarse periódicamente y se pueden planificar campañas para recoger o actualizar datos de especial interés. Además permite recoger las coordenadas de los equipamientos.

La EIEL es muy completa y tiene un "diccionario de datos" donde se especifica que elementos se recogen, y los valores que pueden tener los atributos de esos elementos.

El modelo de datos de la EIEL viene fundamentalmente reflejado en lo que denominan "Diccionario de terminos".

-   https://mpt.gob.es/dam/es/portal/politica-territorial/local/coop_econom_local_estado_fondos_europeos/eiel/Metodolog-a_documentaci-n/documentacion_2010_2011/parrafo/0/Diccionario-de-Terminos

El modelo de datos es complejo y analizándolo en detalle se podrían sacar algunas ideas pero no unas categorías directas. El mayor interés estaría en mantener actualizados los POIs en base a los datos de la EIEL y disponer de mecanismos automáticos para la sincronización de los puntos.

El equipo consultor opina que no deberían dedicarse muchos esfuerzos a esta fuente de datos.

#### Otras referencias sobre la EIEL

-   Información general sobre la EIEL: https://mpt.gob.es/portal/politica-territorial/local/coop_econom_local_estado_fondos_europeos/eiel.html
-   Enlace a los cambios de cómo debe realizarse la encuesta según el año: https://mpt.gob.es/politica-territorial/local/coop_econom_local_estado_fondos_europeos/eiel/Metodolog-a-y-documentaci-n/Hist-rico-metodolog-a-y-documentaci-n.html
-   Todos los cambios están basado en realidad en la metodología de 2010-2001: https://mpt.gob.es/politica-territorial/local/coop_econom_local_estado_fondos_europeos/eiel/Metodolog-a-y-documentaci-n/Hist-rico-metodolog-a-y-documentaci-n/Metodolog-a-documentacion_2010_2011.html
-   Manual de instrucciones: https://mpt.gob.es/dam/es/portal/politica-territorial/local/coop_econom_local_estado_fondos_europeos/eiel/Metodolog-a_documentaci-n/documentacion_2010_2011/Manual-de-Instrucciones-2011-actualizado-octubre-2017.pdf
-   EIEL dipalme. https://app.dipalme.org/geoalmeria/

### BTA y BTN

La Base Topográfica Armonizada (BTA) y la Base Topográfica Nacional (BTN) son dos de las principales normas (y datos para descargar) de información geográfica en España, a distintos niveles de Escala.

Son buenos capturando fenómenos físicos o temáticos estáticos, por ejemplo un hospital, pero no están enfocados al uso concreto cómo si una parte de una edificación es un Bar.

Si bien se pueden sacar ideas de clasificación tanto de la BTA cómo de la BTN, especialmente de la BTN no hay una categorización directa cómo la que interesa para el visor.

El equipo consultor opina que no deberían dedicarse muchos esfuerzos a esta fuente de datos.

### Descripción de la BTA

Manteniendo el espíritu inicial por conseguir la necesaria homogeneidad de la cartografía oficial
española a grandes escalas, se han consensuado las presentes especificaciones técnicas, a fin de lograr
la armonización de las bases topográficas mediante la definición de un producto virtual llamado Base
Topográfica Armonizada (BTA), que permiten la generación de la cartografía topográfica a escalas
1:5 000 o 1:10 000 en las distintas Comunidades Autónomas (CC.AA.), Diputaciones Forales
(DD.FF.) o en la Administración General del Estado (AGE) para hacer posible el intercambio de
información geográfica digital, su integración e interoperabilidad.

Especificaciones de la Base Topográfica Armonizada 1:5000 (BTA) v1.0. En el punto "6.2 Descripción del contenido" se enumeran los temas que abarca la BTA. En el "Anexo A: Catálogo" está el listado completo de capas y atributos y dominios.

-   https://www.transportes.gob.es/recursos_mfom/comodin/recursos/especificaciones_btav10.pdf

### Descripción de la BTN y (BTN-POI)

La Base Topográfica Nacional (BTN) es la base de datos geográfica multiescala de todo el territorio nacional (rango
1:2000/1:25000). El proyecto BTN comienza en el año 2006 y constituye la capa básica sobre la que implementar una
estructura más compleja que permita utilizar

Una salida muy demandada de la BTN, que se constituye como producto independiente, son los Puntos de Interés de la
Base Topográfica Nacional (BTN-POI), los cuales representan localizaciones geográficas específicas destacadas que
pueden resultar útiles o interesantes al usuario. El producto BTN-POI se obtiene a partir de los elementos contenidos en
las diferentes capas de la Base Topográfica Nacional y abarca todo el abanico y diversidad de sus diferentes temáticas,
representando una visión simplificada de la misma.

Especificaciones de la BTN. En la página 158 hay un resumen de la clasificación temática. https://www.ign.es/resources/docs/IGNCnig/BTN/ESPBTN.pdf

### Otras referencias sobre la BTA y la BTN

-   Enlaces a documentación sobre la BTA. http://www.icc.es/web/cnccontent/bta.html
-   Descarga de BTN. https://centrodedescargas.cnig.es/CentroDescargas/btn
-   Descarga de BTN-POI. https://centrodedescargas.cnig.es/CentroDescargas/btn-poi

### Proveedores comerciales

Los provedores comerciales de información (Google, Microsoft, Mapbox, ...) además de mantener una buena base de datos actualizada de POIs hacen grandes esfuerzos en documentar sus modelos de información para obtener clientes. Además los usuarios están habituados a la forma en que clasifican la información, por lo que puede ser una buena fuente para definir categorías.

#### Google

La API de Google Places (New) tiene un listado de categorías interesante.

https://developers.google.com/maps/documentation/places/web-service/place-types#table-a

Listado de categorías:

-   Automoción
-   Empresas
-   Cultura
-   Educación
-   Entretenimiento y ocio
-   Instalaciones
-   Finanzas
-   Alimentación y bebidas
-   Áreas geográficas
-   Gobierno
-   Salud y bienestar
-   Alojamiento
-   Espacios naturales
-   Lugares de culto
-   Servicios
-   Compras
-   Deportes
-   Transporte

#### Microsoft

Microsoft a través de su plataforma Bing/Azure también proporciona API para POIs y establece ciertas categorías. Pero son demasiadas para extraer un listado claro.

-   https://learn.microsoft.com/en-us/bingmaps/spatial-data-services/public-data-sources/poi-entity-types
-   https://learn.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/type-identifiers/

#### SafeGraph

SafeGraph no es un proveedor conocido pero sus categorías están basadas en [NAICS](https://www.census.gov/naics/) las estándar del gobierno de EEUU.

-   https://www.safegraph.com/guides/points-of-interest-poi-data-guide
-   https://docs.safegraph.com/docs/places-summary-statistics#section-category-statistics
-   https://www.census.gov/naics/

Categorías que emplea:

-   Comercio al por menor
-   Asistencia sanitaria y social
-   Hostelería y restauración
-   Otros Servicios (excepto Administración Pública)
-   Transporte y almacenamiento
-   Alquiler y arrendamiento de inmuebles
-   Servicios profesionales, científicos y técnicos
-   Construcción
-   Finanzas y seguros
-   Arte, entretenimiento y ocio
-   Servicios administrativos y de apoyo y gestión de residuos y descontaminación
-   Servicios educativos
-   Industria
-   Información
-   Administración Pública
-   Comercio al por Mayor
-   Gestión de Sociedades y Empresas
-   Agricultura, silvicultura, pesca y caza
-   Servicios Públicos
-   Minería

#### Otros proveedores

-   **Foursquare** tiene una de las bases de datos de POIs más completas del mercado. El problema es que las categorías que usa son bastantes y deberían ser reducidas para nuestro caso de uso. https://docs.foursquare.com/data-products/docs/categories#find-a-category-id-2

-   **HERE**.

    -   https://www.here.com/docs/bundle/vector-tile-api-developer-guide/page/topics/layers-points-of-interest.html
    -   https://www.here.com/docs/bundle/places-search-api-developer-guide/page/topics/place_categories/places-category-system.html

-   **Mapbox** también tiene listado de POIs pero sus categorías son más de 400.

    -   https://www.mapbox.com/insights/poi-database
    -   https://docs.mapbox.com/api/search/search-box/#get-category-list

### Proveedores no lucrativos

#### Overture Maps

Overture Maps es una fundación creada por Amazon, Meta, Microsoft y otras para crear el conjunto de datos geográficos abiertos más grande y preciso existente.

Está bien documentado y sus datos son de calidad.

En el dateset de Places usan las categorías que se pueden ver en el siguiente enlace, pero que no cuadran demasiado bien con nuestro caso de uso:

https://docs.overturemaps.org/schema/concepts/by-theme/places/

Emparejado entre categorías de OSM y categorías de Overture. https://wiki.openstreetmap.org/wiki/Overture_categories

#### OpenStreetMap

El problema de OSM es que a pesar de que la documentación es abundante, al intentar capturar todo tipo de información, es difícil obtener un listado de categorías concreto y único para nuestro caso de uso.

Lo más fácil es el listado informal de categorías en las que agrupan el tag `amenity`:

-   Restauración
-   Educación
-   Transporte
-   Finanzas
-   Sanidad
-   Entretenimiento, arte y cultura
-   Servicios públicos
-   Instalaciones
-   Gestión de residuos
-   Otros

##### Referencias OSM

-   https://wiki.openstreetmap.org/wiki/Points_of_interest
-   https://wiki.openstreetmap.org/wiki/Map_features
-   https://wiki.openstreetmap.org/wiki/Key:amenity

#### SJJB Mapicons

SJBB Mapicons es un conjunto de iconos pensados para ser usados en mapas para la simbología de puntos de interés. Sus categorías y subcategorías están basados en los elementos de OpenStreetMap.

-   https://www.sjjb.co.uk/mapicons/contactsheet

iCarto. Enviará posibles categorizaciones basadas en sistemas existentes. ie: EIEL, BTA, OSM, ..., y en los datos existentes.

En esta web se pueden descargar iconos para POIs. Sus categorías están basadas en las OSM, y serían:

-   Alojamiento
-   Servicios
-   Educación
-   Comida (Restauración, Cafeterías, ...)
-   Salud
-   Finanzas
-   Lugar de culto (Religión)
-   POI
-   Compras
-   Deporte
-   Turismo
-   Transporte

Tiene otras categorías que no nos interesan:

-   Energía
-   Barreras
-   Uso del suelo
-   Agua
