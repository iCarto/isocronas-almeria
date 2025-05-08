#!/bin/bash

# Builds the assets for the deploy

set -euo pipefail

[[ "${0}" != ./scripts/deploy.sh ]] && echo "Call the script from the proyect root" && exit 1
[[ -z "${VIRTUAL_ENV}" ]] && echo "virtualenv should be activated before continue" && exit 1

# shellcheck source=../scripts/variables.ini
source scripts/variables.ini

FOLDER="/tmp/${TODAY}_${PROJECT_NAME}_deploy"

docker compose down
rm -rf "${FOLDER}"
mkdir -p "${FOLDER}"

echo "
## Build git repo .zip
"
git archive --format=zip --output="${FOLDER}"/isocronas-almeria.zip HEAD

echo "
## Build instalable application file
"
export DISABLE_ESLINT_PLUGIN=true
cd front && npm install && REACT_APP_API_BASE_URL='' npm run build && cd ..

# echo "
# ## Build database dump
# "

# PG_DUMP=pg_dump
# if [[ -f /usr/lib/postgresql/${PG_VERSION}/bin/pg_dump ]]; then
#     PG_DUMP=/usr/lib/postgresql/${PG_VERSION}/bin/pg_dump
# fi

# PG_DUMP_VERSION=$(${PG_DUMP} --version | grep -oE ' [0-9.]* ' | cut -d'.' -f1)

# if [[ "${PG_DUMP_VERSION}" != "${PG_VERSION}" ]]; then
#     echo >&2 "Si la versión de pg_dump (${PG_DUMP_VERSION}) es mayor a la versión de PostgreSQL (${PG_VERSION}) puede haber problemas al hacer pg_restore"
# fi

# "${PG_DUMP}" -Fc -Z9 -E UTF8 -h localhost -p "${PG_PORT}" -U postgres -d "${DBNAME}" -f "${FOLDER}/${TODAY}_${PROJECT_NAME}.dump"

echo "
## Build server config
"
mkdir -p "${FOLDER}"/app/.cache/volumes/apache/
mkdir -p "${FOLDER}"/app/scripts

cp .env compose.yml "${FOLDER}"/app/
cp -r scripts/docker "${FOLDER}"/app/scripts/
sudo cp -r .cache/volumes/postgresql "${FOLDER}"/app/.cache/volumes/postgresql
sudo cp -r .cache/volumes/geoserver "${FOLDER}"/app/.cache/volumes/geoserver
mv front/dist "${FOLDER}"/app/.cache/volumes/apache/frontend
sudo chown -R "${USER}":"${USER}" "${FOLDER}"

docker run --rm httpd:latest cat /usr/local/apache2/conf/httpd.conf > "${FOLDER}"/app/scripts/docker/apache/httpd.conf
sed -i \
    -e 's/^#\(Include .*httpd-ssl.conf\)/\1/' \
    -e 's/^#\(LoadModule .*mod_ssl.so\)/\1/' \
    -e 's/^#\(LoadModule .*mod_socache_shmcb.so\)/\1/' \
    "${FOLDER}"/app/scripts/docker/apache/httpd.conf

tar czf "${FOLDER}".zip "${FOLDER}"

echo "
## Finished
"
