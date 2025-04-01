# Informe Geocodificación

Al proceso de obtener coordenadas geográficas a partir de una dirección física se lo denomina geocodificación.

Para geocodificar los POIs se llevaron a cabo varias acciones que explicamos brevemente a continuación.

Primero se hace un intento de normalizar el campo dirección en base a distintos criterios. Eliminar saltos de línea, corregir errores en los nombres (Amería en lugar de Almería), ... Asimismo se elimina el nombre del municipio y de la provincia de la dirección.

Se usa la API de Google de Geocoding para obtener las coordenadas e información que permita validar el datos. Además de la dirección normalizada se fuerza que genere direcciones dentro del municipio que se ha asignado al POI.

Muchos de los POIs (unos 2000) tienen valores de dirección que son insuficientes para resolverlos adecuadamente, y sólo devuelven ubicaciones genéricas. Además 52 de ellos ni siquiera tienen dirección.

Se hace una prueba de geocodificación usando la API de Google Places (Text Search New), para intentar obtener mejores resultados combinando nombre del poi y dirección usando parámetros de corrección como el bounding box de la provincia. Lo bueno de estas API es que permiten obtener información adicional como las categorías que emplea Google para el punto, teléfono, ... Pero también tienen varios problemas:

-   No son gratuitas. Unos 100€ para 5.000 puntos
-   Generan bastantes falsos positivos, que son difíciles de filtrar.

Dado el esfuerzo que supone descartar los falsos positivos se decide no usar los datos de Google Places.

Los puntos para el municipio de referencia "Alhama de Almería" son ajustados a mano.
