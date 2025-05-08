#!/bin/bash

fixtures_this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
source "${fixtures_this_dir}"/../scripts/variables.ini
# (cd "${fixtures_this_dir}/../tools" && bash fixtures.sh)

ogr2ogr -update -overwrite -makevalid -nlt PROMOTE_TO_MULTI -lco GEOMETRY_NAME=geom -lco FID=id -f PostgreSQL PG:"dbname=${DBNAME} host=localhost port=${PG_PORT} user=${PG_USER}" "${fixtures_this_dir}"/../.cache/fixtures/base.gpkg

TEST_POI_PATH="${fixtures_this_dir}"/../.cache/fixtures/test_pois.gpkg
PG_TABLE_NAME="poi"
if [[ -f "${TEST_POI_PATH}" ]]; then
    ogr2ogr -update -overwrite -makevalid -nlt POINT -lco GEOMETRY_NAME=geom -lco FID=id -nln public."${PG_TABLE_NAME}" -f PostgreSQL PG:"dbname=${DBNAME} host=localhost port=${PG_PORT} user=${PG_USER}" "${TEST_POI_PATH}"
    ${PSQL} "${PG_CONNECTION}" -c "
        ALTER TABLE public.${PG_TABLE_NAME} ALTER COLUMN tags TYPE varchar[] USING string_to_array(tags, '; ');
        ALTER TABLE public.${PG_TABLE_NAME} ALTER COLUMN extra TYPE JSONB USING extra::jsonb;
    "
fi

TEST_FAKE_POI_PATH="${fixtures_this_dir}"/../.cache/fixtures/test_fake_pois.gpkg
PG_TABLE_NAME="fake_poi"
if [[ -f "${TEST_FAKE_POI_PATH}" ]]; then
    ogr2ogr -update -overwrite -makevalid -nlt POINT -lco GEOMETRY_NAME=geom -lco FID=id -nln public."${PG_TABLE_NAME}" -f PostgreSQL PG:"dbname=${DBNAME} host=localhost port=${PG_PORT} user=${PG_USER}" "${TEST_FAKE_POI_PATH}"
    ${PSQL} "${PG_CONNECTION}" -c "
        ALTER TABLE public.${PG_TABLE_NAME} ALTER COLUMN tags TYPE varchar[] USING string_to_array(tags, '; ');
        ALTER TABLE public.${PG_TABLE_NAME} ALTER COLUMN extra TYPE JSONB USING extra::jsonb;
    "
fi
