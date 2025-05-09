#!/bin/bash

# bash drop_and_create_db.sh [DBNAME.dump]

# This scripts covers the following workflow:
# 1. The database `"${DBNAME}` exists but must be dropped
# 2. Just in case something usefull is still in the database a backup is made and named as: `"${DBNAME}_tmp_${TODAY}"`
# 3. Usually, in the same working session, the first time the backup is make, it will contain usefull information. But
#    the following times in the same day that the script is executed, `"${DBNAME}` will not contain usefull data.
#    These following executions of the script will be produce for error-iteration. Just in case, by default, if
#    `"${DBNAME}_tmp_${TODAY}"` exists, the script will fail. But variable `FAIL_IF_TODAY_BCK_EXISTS` can be modified
#    to "respect" the original backup, and don't try to create a new one (wich will fail). A "TODO", will be allow the
#    creation of others backups automatically like `"${DBNAME}_tmp_${TODAY}_1"`, and handle it via parameters
# 4. Sometimes, it's very confortable restore a given dump, just after the drop/create cycle. The script allows this.
#    To avoid errors, make some checks on the dump name, and then restores the dump into `"${DBNAME}`. It also Creates
#    a yymmdd_DBNAME that can be used as template, if `"${DBNAME}` gets "corrupted".

# Backups begins with database name instead of date, because they are intented to be dropped in "little time", and
# using a different "prefix" that the "production versions", seems to avoid errors derived from typings and hurries

set -e

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
# shellcheck source=variables.ini
source "${this_dir}/variables.ini"

TEMPLATE="template0"
DUMP_FILE=""

while [[ -n "${1}" ]]; do
    case "${1}" in
        --template)
            if [[ -n "${2}" ]]; then
                TEMPLATE="${2}"
                shift
            else
                echo "Bad argument" && exit 1
            fi
            ;;
        --dump-file)
            # TODO: Improve checks
            # To check names like yymmdd_DBNAME.dump
            # [[ (-f "${2}") && ("${2}" =~ [0-9][0-9][0-9][0-9][0-9][0-9]_${DBNAME}.dump) ]]
            if [[ (-f "${2}") && ("${2}" =~ .*${DBNAME}.*.dump) ]]; then
                DUMP_FILE="${2}"
                shift
            else
                echo "Bad argument" && exit 1
            fi
            ;;
        *)
            echo "Bad usage: ${0} [--template <template> | --dump-file <file>]" && exit 1
            ;;
    esac
    shift
done

kickout_users() {
    # Kills all connections to the database to make the backup
    local DBNAME="${1}"
    ${PSQL} -h localhost -p "${PG_PORT}" -U postgres -d postgres -c "select pg_terminate_backend(pid) from pg_stat_activity where datname='${DBNAME}';"
}

FAIL_IF_TODAY_BCK_EXISTS="True" # Setear cualquier otro valor para cambiar

TODAY_MAIN_DB_BACKUP="${DBNAME}_tmp_${TODAY}"

kickout_users "${DBNAME}"

## Renames the database to make a backup ##

# Other way to check if the database exists
# if ! sudo -u postgres psql -d ${DBNAME} -c "select 1" > /dev/null 2>&1; then
#     sudo -u postgres createdb -O ${PG_OWNER_USER} -E UTF-8 ${DBNAME}
# fi
MAIN_DB_EXISTS=$(${PSQL} -A -t -h localhost -p "${PG_PORT}" -U postgres -d postgres -c "SELECT 'True' FROM pg_database WHERE datname='${DBNAME}';")
TODAY_MAIN_DB_BACKUP_EXISTS=$(${PSQL} -A -t -h localhost -p "${PG_PORT}" -U postgres -d postgres -c "SELECT 'True' FROM pg_database WHERE datname='${TODAY_MAIN_DB_BACKUP}';")

if [[ "${MAIN_DB_EXISTS}" == "True" && "${TODAY_MAIN_DB_BACKUP_EXISTS}" != "True" || ("${TODAY_MAIN_DB_BACKUP_EXISTS}" == "True" && ${FAIL_IF_TODAY_BCK_EXISTS} == "True") ]]; then
    echo "Renombrando ${DBNAME} a ${TODAY_MAIN_DB_BACKUP}"
    ${PSQL} -h localhost -p "${PG_PORT}" -U postgres -d postgres -c "ALTER DATABASE \"${DBNAME}\" RENAME TO \"${TODAY_MAIN_DB_BACKUP}\";"
fi

MAIN_DB_EXISTS=$(${PSQL} -A -t -h localhost -p "${PG_PORT}" -U postgres -d postgres -c "SELECT 'True' FROM pg_database WHERE datname='${DBNAME}';")
if [[ "${MAIN_DB_EXISTS}" == "True" ]]; then
    # Si entramos aquí es porque la base de datos antigua no se ha renombrado
    # En lugar de este if, prodríamos usar el parámetro `--if-exists`. Pero perdemos la info de logging. Toda esta parte hay que refactorizarla
    echo "Eliminando ${DBNAME}"
    dropdb -h localhost -p "${PG_PORT}" -U postgres "${DBNAME}"
fi

## Creates the database again ##
# https://www.postgresql.org/docs/current/static/manage-ag-templatedbs.html
echo "Creando ${DBNAME}"
createdb -h localhost -p "${PG_PORT}" -U postgres -T "${TEMPLATE}" -O "${PG_OWNER_USER}" -E UTF-8 -l "${LOCALE}" "${DBNAME}"

if [[ -n "${DUMP_FILE}" ]]; then
    echo "Restaurando ${DUMP_FILE} en ${DBNAME}"
    ${PGRESTORE} -h localhost -p "${PG_PORT}" -U postgres -d "${DBNAME}" --single-transaction --exit-on-error --disable-triggers "${DUMP_FILE}"
    if [[ (-f "${1}") && ("${1}" =~ [0-9][0-9][0-9][0-9][0-9][0-9]_${DBNAME}.dump) ]]; then
        # Si el nombre del dump parece tener una fecha 230210_dbame creamos un template también
        # TODO: Esto hay que mejorarlo
        echo "Creando $(basename "${DUMP_FILE%.dump}")"
        createdb -h localhost -p "${PG_PORT}" -U postgres -T "${DBNAME}" -O "${PG_OWNER_USER}" -E UTF-8 -l "${LOCALE}" "$(basename "${DUMP_FILE%.dump}")"
    fi
fi

# TODO: Cuando crear la extensión hay que pensarlo mejor.
${PSQL} -h localhost -p "${PG_PORT}" -U postgres -d "${DBNAME}" -c "
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS unaccent;
"
