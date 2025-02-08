#!/bin/bash

fixtures_this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
source "${fixtures_this_dir}"/../server/variables.ini
# (cd "${fixtures_this_dir}/../tools" && bash fixtures.sh)

ogr2ogr -update -overwrite -makevalid -nlt PROMOTE_TO_MULTI -lco GEOMETRY_NAME=geom -lco FID=id -f PostgreSQL PG:"dbname=${DBNAME} host=localhost port=${PG_PORT} user=${PG_USER}" "${fixtures_this_dir}"/../.cache/fixtures/base.gpkg
ogr2ogr -update -overwrite -makevalid -nlt POINT -lco GEOMETRY_NAME=geom -lco FID=id -nln public.poi -f PostgreSQL PG:"dbname=${DBNAME} host=localhost port=${PG_PORT} user=${PG_USER}" "${fixtures_this_dir}"/../.cache/fixtures/test_pois.gpkg

${PSQL} "${PG_CONNECTION}" -c "
ALTER TABLE public.poi ALTER COLUMN tags TYPE varchar[] USING string_to_array(tags, '; ');
ALTER TABLE public.poi ALTER COLUMN extra TYPE JSONB USING extra::jsonb;
"
