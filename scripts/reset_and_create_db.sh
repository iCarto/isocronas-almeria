#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../server/variables.ini
source "${this_dir}"/util/geoserver_delete.sh
source "${this_dir}"/util/geoserver_create.sh
source "${this_dir}"/../tools/output.sh

# TODO: Revisar como hacer esto de forma adecuada (funciones?, script?)
# bash "${this_dir}/../server/drop_and_create_db.sh" --template template_snimf

bash "${this_dir}"/fixtures.sh
geoserver_delete_workspace
geoserver_create_workspace
geoserver_create_postgis_datastore
geoserver_create_layer poi poi
geoserver_create_layer fake_poi fake_poi

echo ""
green "DONE"
