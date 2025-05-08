# Isocronas-Almería

Una aplicación de frontend con React que muestra en un geovisor puntos de interés (POIs) en base a distintas categorías basadas en [la ciudad de los 15 minutos](https://es.wikipedia.org/wiki/Ciudad_de_15_minutos), y usa un servicio externo de isocronas para visibilizar cómo los municipios de Almería tienen un acceso rápido a los servicios necesarios para la ciudadanía.

Los POIs fueron recopilados por la Diputación de Almería.

## Documentación

El directorio docs contiene documentación adicional:

-   `reports`: Información sobre el procesado de los puntos e informes relevantes sobre la calidad de los datos
-   `user_guide`: Documentación sobre el uso de la aplicación. (Por hacer)
-   `dev_guide`: Documentación sobre el desarrollo y despliegue de la aplicación

## Estructura del repositorio

-   `back`. Código de backend (sin uso en este momento)
-   `front`. Código de frontend. Las librerías principales empleadas son: React, MUI, Leaflet. Usa Vite como sistema de build
-   `scripts`. Utilidades y configuraciones para los entornos de desarrollo, staging y producción.
-   `/`. En la raíz del repositorios se encuentran las configuraciones de las herramientas (prettier, stylelint, shellcheck, ruff, pre-commit, markdownlint, ...). También el fichero de docker `compose.yml` para levantar un entorno.

## Configuración del entorno de Desarrollo

Si se usa Linux y se tienen instaladas las siguientes dependencias:

-   docker
-   pyenv
-   mkvirtualenv
-   node y npm
-   psql

Se puede configurar el entorno del siguiente modo.

```shell
# Instala las librerías y prepara el entorno de trabajo
./scripts/install.sh

# Get `fixtures` folder and place it in `.cache/fixtures`. Remember keep it up to date.
docker compose up -d
./scripts/reset_and_create_db.sh
```

En caso de no necesitar la experiencia completa de desarrollo sólo es necesario node, npm, docker y psql:

```shell
# Preparar datos de prueba
# Obtener la carpeta `fixtures` con los datos de prueba
mkdir -p .cache && mv PATH_TO_ORG_FIXTURES .cache/fixtures

# Levantar geoserver y postgres
docker compose up -d

# Cargar postgres con los datos de prueba y configurar geoserver
./scripts/reset_and_create_db.sh

# Instalar las librerías del front
cd front && npm install
```

### Activar el entorno una vez configurado por primera vez

```shell
# Levantar postgres y geoserver
docker compose up -d

# Activar el entorno virtual de Python
workon "${PROJECT_NAME}"

# Lanzar el servidor de desarrollo del front
./scripts/start.sh -f
```

## Generar el código de producción

**Importante**: Comprobar que el fichero `.env.production` tiene los valores adecuados. Ver el script `./scripts/install.front.sh` para una explicación de las variables.

Para generar el código para producción se puede usar este comando:

```shell
cd front && npm install && REACT_APP_API_BASE_URL='' npm run build && cd ..
```

Esto creará la carpeta `front/dist`. El contenido de esa carpeta puede desplegarse en cualquier servidor web estático (nginx, apache, ...)

Se asume que:

-   Existe un Geoserver que sirve los POIs
-   Se ha configurado el servicio de Mapbox para admitir peticiones desde el dominio donde esté desplegada la aplicación
