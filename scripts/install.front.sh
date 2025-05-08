#!/bin/bash

set -euo pipefail

if [[ ! -f front/package.json ]]; then
    echo "Skip installing frontend"
    exit
fi

(
    cd front || exit
    npm install
)

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

echo "
# Estas tres variables no son necesarias en este proyecto, están por legacy
REACT_APP_PAGE_SIZE=600
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_IDLE_SECONDS_LOGOUT=6000

# Dejar en blanco en este fichero.
# Sobreescribir en el .env.production. O dejar también en blanco si no se usa sentry
REACT_APP_SENTRY_DSN=
REACT_APP_SENTRY_AUTH_TOKEN=

# En este fichero usar el token de desarrollo
# Sobreescribir en el .env.production
REACT_APP_MAPBOX_TOKEN=

# Endpoint del servicio WFS que servirá los POIs
# Sobreescribir en el .env.production
REACT_APP_POI_WFS_URL='http://localhost:3000/geoserver/wfs'

# Workspace y layer de los POIs. Es el parámetro TYPENAMES del servicio WFS
# Sobreescribir en el .env.production
REACT_APP_POI_WFS_TYPENAMES='isocronas:poi'

# Tiempo en días que se almacena en LocalStorage los POIs y algunas de las iscronas
# calculadas para optimizar el rendimiento.
# En desarrollo se puede poner a 0 para ignorar la cache. O borrar puntualmente desde
# devtools del navegador con 'localStorage.clear()'
# Sobreescribir en el .env.production
REACT_APP_POI_CACHE_DAYS=7
" > front/.env

echo "
REACT_APP_SENTRY_DSN=
REACT_APP_SENTRY_AUTH_TOKEN=

REACT_APP_MAPBOX_TOKEN=

REACT_APP_POI_WFS_URL='http://localhost:3000/geoserver/wfs'
REACT_APP_POI_WFS_TYPENAMES='isocronas:poi'
REACT_APP_POI_CACHE_DAYS=7
" > front/.env.production
