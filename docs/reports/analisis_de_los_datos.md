# BORRADOR: Análisis de los datos

## Introducción

Este documento presenta un análisis sobre los datos enviados por la Diputación de Almería el 28 de Enero de 2025, a los que nos referiremos de ahora en adelante de forma genérica como POIs.

En los trabajos de recolección y procesado de datos debe definirse desde el principio a que fin estarán destinados, el formato de los mismos y su mantenimiento (actualización, ...).

Y atendiendo al mantenimiento debe definirse cual es la _fuente de verdad_. Cuales son los "datos buenos" que se usarán para posteriores trabajos y actualizaciones y a partir de los cuales se generarán subproductos. Si por ejemplo consideramos como _fuente de verdad_ los ficheros docx, no deberían realizarse modificaciones de contenido en un fichero xlsx, si no en el original, si no siempre habrá inconsistencias y duplicidades.

## Resumen

Los datos presentan bastantes anomalías. El equipo consultor considera que no pueden emplearse en un visor público tal cual están en este momento.

Ateniendo al objetivo del presente contrato, un visor de POIs de servicios útiles para la ciudadanía en el contexto de lucha contra la despoblación es necesario revisar con cuidado los datos:

-   Se observan comentarios dentro del propio nombre del POI cómo "LUBRINSPAIN ERROR DUPLICIDAD".
-   En el campo de descripción que debería emplearse para categorizar los puntos hay textos como "MIEL".
-   Hay POIs cómo "RÍO LÍJAR", "ANTENA DE TELEVISIÓN" o "PARQUE EÓLICO LOMA AYALA". Estos puntos no tienen en principio sentido para este tipo de visor.
    -   Los títulos de "Entidades o servicios" y "Lugares de interés" deberían servir para distinguir los puntos. Siendo los primeros (Bares, tiendas, ...) los que interesan para el visor y los segundos (Ermita, Puente, ...) los que no. Pero están mezclados y bajo "Lugares" hay puntos cómo "Salón Peluquería y estética Lola" o "Asesoria Gestoría Rumar"

## Descripción de la información proporcionada

Los datos se envían como un directorio `1_DEFINITIVOS` con los siguientes subdirectorios correspondientes a las comarcas de Almería.

-   ALMANZORA
-   ALPUJARRA
-   FILABRES
-   LEVANTE
-   LOS VELEZ
-   METROPOLITANA
-   PONIENTE

En total son 80 ficheros distribuidos por extensión del siguiente modo:

-   **.docx**: 72 ficheros. En general, los documentos contienen un header, un footer y dos tablas, con las tablas precedidas del texto "Entidades o servicios interés municipal" o "Lugares de interés municipal".
-   **.odt**: 5 ficheros. Estructura similar a los `docx`.
-   **.pdf**: 1 fichero. Corresponde al municipio de ANTAS. En el formato actual es difícil extraer los datos. No se procesa.
-   **.ods**: 1 fichero. Corresponde al municipio LOS GALLARDOS. Una hoja de cálculo donde algunas columnas parecen provenir del uso de un API tipo Google Places. No se procesa.
-   **.db**: 1 fichero. Un `Thumbs.db` que puede ser ignorado.

La cabecera de las tablas suele ser la siguiente:

-   NOMBRE
-   MUNICIPIO
-   ÁMBITO
-   WEB
-   DIRECCIÓN
-   CATEGORIAS / DESCRIPCIÓN
-   DIRIGIDO A
-   TELEFONO

La distribución de los puntos es irregular, hay varios con más de 150 puntos, otros cómo ENIX con sólo 4. De media 65 puntos por municipio (Ver pestaña `Rows per File and Tipo`). En total contamos con 4907 puntos.

## Procesado general de los datos

La mayoría del proceso se realiza mediante scripts en python acompañados de observación visual y algunas partes manuales.

-   Los ficheros .odt se transforman a .docx y se procesan del mismo modo que los .docx.
-   Eliminados espacios en blanco al principio o al final. Se han puesto en blanco (`NULL`) las celdas vacías o que usaban "-".
-   Eliminados los "." al final de cada texto. La forma en que se empleaban era inconsistente, y también se usan para separar "categorías".
-   Se crea una columna "FILENAME" que se rellena con el fichero del que proviene cada POI para trazabilidad.
-   Se crea una columna "TIPO" que se rellena con el título asociado a la tabla "Entidades o servicios interés municipal" o "Lugares de interés municipal".
-   Se realiza un primer procesado de la columna DIRIGIDO A para intentar normalizarla a los valores "Ambos", "Ciudadanía", "Empresas". Pero sigue habiendo otros términos.
-   No se trabaja sobre la columna "DIRECCIÓN", se hará durante el proceso de geocodificación.
-   Se hace un primer análisis de las columnas "ÁMBITO" y "CATEGORIAS / DESCRIPCIÓN" de cara a buscar categorías en las que encajar los POIs. Las columnas extra de "categoria_icarto", "ambito_icarto", "categoria_y_ambito_icarto" es un primer intento de normalizar los resultados. Las pestañas adicionales del mismo nombre son un conteo de los valores usados.
-   En la pestaña "NA Values" se puede ver un conteo de los valores en blanco por cada columna.

## Anomalías leves en los datos

Con anomalías leves nos referimos a situaciones qué el equipo consultor ha resuelto durante el procesado de la información y no necesitan mayor revisión.

-   CANJAYAR tiene una sóla tabla sin texto previo. Se asignan todos los datos a "Entidades o servicios interés municipal"
-   LAS TRES VILLAS, LUBRÍN, HUÉCIJA. Tienen una tercera tabla. Parece ser una continuación de la segunda que se dividió en dos por error.
-   RIOJA. Comentarios al principio del documento.
-   TAHAL sólo tiene una tabla, a pesar de tener ambos títulos
-   Muchas tablas tienen cabeceras inconsistentes. Por ejemplo usando "CATEGORIA" en lugar de "CATEGORIAS" o "TELÉFONO" en lugar de "TELEFONO". Si bien esto parecen problemas menores al combinarlo con otros problemas cómo columnas de más o de menos dificulta bastante el procesado y la fiabilidad de los datos. Esto sucede en los municipios de: ÍLLAR, ALBOLODUY, BEIRES, ALCOLEA, ALHABÍA, ALBANCHEZ, ALMANZORA/LÚCAR, ALMANZORA/SIERRO, ALHAMA ALMERIA, ALMÓCITA, ALICÚN
-   En varias tablas falta la columna WEB. Se añade en blanco. ALSODUX, ALHAMA ALMERIA, ALMÓCITA, ALICÚN, BAYARCAL
-   En varias tablas falta la columna DIRIGIDO A. Se añade en blanco. BENTARIQUE, BAYARCAL.
-   La segunda tabla de GERGAL es es inconsistente. Se detecta en las últimas filas donde los bordes están desalineados. Se proceso a mano, insertando filas por el medio y moviendo las últimas filas de sitio para que las librerías python puedan leerla.
-   La primera tabla de ALBOLODUY tiene tres columnas en blanco de más.
-   ALICÚN. La primera tabla está mal. En la columna "web" están metidos los datos de dirección, y el resto de columnas están desplazadas.

Estos municipios tienen filas en blanco en alguna de las tablas. Esas filas simplemente se descartan.

-   METROPOLITANA/GÁDOR.docx
-   METROPOLITANA/PECHINA.docx
-   PONIENTE/DALIAS.docx
-   LOS VELEZ/CHIRIVEL.docx
-   LEVANTE/LUBRÍN.docx
-   ALPUJARRA/ÍLLAR.docx
-   ALPUJARRA/ALBOLODUY.docx
-   ALPUJARRA/HUÉCIJA.docx
-   ALPUJARRA/ALSODUX.docx
-   ALPUJARRA/RÁGOL.docx
-   ALPUJARRA/CANJAYAR.docx
-   ALMANZORA/FINES.docx
-   ALMANZORA/SERON.docx
-   ALMANZORA/LAROYA.docx

## Anomalías graves en los datos

Con anomalías graves nos referimos a situaciones qué el equipo consultor ha resuelto de una forma que puede no ser la más adecuada y que la Diputación debería revisar.

Además de los casos concretos que se especifican a continuación se observa que en las tablas hay filas en color diferente, con formato "tachadura", comentarios sobre los datos en las propias tablas o en el texto, ... En general toda la información debería ser revisada con detalle.

-   MARIA. Tiene una tercera tabla con datos sobre asociaciones. Los ignoramos.
-   LUBRIN. Tiene unos datos sobre alojamientos al final. Los ignoramos.
-   GÁDOR. Tiene unos textos al principio sobre correcciones a realizar que ignoramos. En la propia tabla uno de los nombres pone "PLAZA DE TOROS (EN DESUSO) SE REPITE ELIMINAR". Incluímos todos los puntos tal cual aparecen.
-   TABERNAS. Tiene comentarios de posibles lugares en el medio del documento que se ignoran.
-   VELEZ BLANCO. Tiene un comentario "En el texto del estudio poneis el restaurante La PIza que no está en Vélez-Blanco sino en María." al final del documento que se ignora. Incluímos todos los puntos tal cual aparecen.
-   FONDÓN. Tiene comentarios al final del documento sobre posibles lugares. En la propia tabla hay comentarios cómo "La mujer existe pero no está claro que siga siendo un negocio". Incluímos todos los puntos tal cual aparecen.
-   Varias tablas tienen una columna EMAIL que el resto no tienen. Esta información está siendo ignorada. ALICÚN, BAYARCAL, SUFLÍ.

En los siguientes municipios la columna "MUNICIPIO" a veces está en blanco o tiene valores distintos. Por ejemplo 'Santa Fe de Mondújar' vs 'Santa Fé de Mondújar'. La rellenamos con el valor correcto y uniformizamos.

-   ALPUJARRA/ALBOLODUY
-   ALMANZORA/PURCHENA
-   ALMANZORA/LAROYA
-   ALMANZORA/LÍJAR
-   METROPOLITANA/SANTA FÉ
-   METROPOLITANA/PECHINA
-   FILABRES/NACIMIENTO
-   FILABRES/FIÑANA
-   FILABRES/CASTRO FILABRES
-   ALMANZORA/SUFLÍ
-   ALMANZORA/ARBOLEAS
-   ALMANZORA/PURCHENA
-   ALMANZORA/LAROYA
-   ALMANZORA/LÍJAR
-   ALPUJARRA/ALSODUX

En la columna MUNICIPIO hay más particularidades:

-   En BÉDAR, hay un punto que parece que en realidad es de Vera. Se le pone Bédar.
-   En ALPUJARRA/ALBOLODUY aparecen los nombres ['Alboloduy' 'Alcubillas Altas, Alboloduy' 'Las Alcubillas Altas']. Se asignan todos a "Alboloduy".
-   En FILABRES/BENIZALON aparecen los nombres ['Benizalón' 'Fuente de la Higuera, Benizalón'] se asignan todos a "Benizalón"
-   En ALPUJARRA/ALCOLEA aparecen los nombres ['Alcolea' 'Darrícal (Alcolea)' 'Lucainena (Alcolea)']. Se asignan todos a Alcolea.
-   En ALPUJARRA/BENTARIQUE hay un punto que se dice que está en otro municipio "ESTÁ EN ALHAMA DE ALMERÍA, NO EN BENTARIQUE". Lo asignamos a Bentarique.
-   En ENIX hay un punto asignado a EL MARCHAL. Se asigna a "Enix".

## Cuestiones abiertas o acciones necesarias

-   Es necesario proporcionar los datos de LOS GALLARDOS y ANTAS en un formato adecuado para que sean procesados.
-   Qué valores se quieren emplear en la columna "DIRIGIDO A"
-   ¿Cual será la fuente de verdad de los datos?. Los .docx. Un xlsx que se genere en este proceso. La base de datos donde estén los POIs. En el visor no es necesario usar todos los puntos o atributos siempre que se puedan filtrar con sencillez.
-   Cómo abordar la revisión de los datos. En el presente contrato el compromiso es centrarse únicamente en un municipio. Se pueden valorar acciones a mayores en función de la evolución del trabajo.
-   Definir el modelo de datos interno. Una cosa es el modelo de datos interno que se maneje para la considerada "fuente de verdad" que puede tener todos los atributos que se deseen y que se puede ir refinando con el tiempo, y otra cosa la información que se presente en el visor. Así por ejemplo se puede mantener un campo interno de "etiquetas", pero no usar este, al menos por ahora en el visor.
