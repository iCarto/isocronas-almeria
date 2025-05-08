#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../scripts/variables.ini
source "${this_dir}"/util/geoserver_utils.sh
source "${this_dir}"/../scripts/util/output.sh

# bash "${this_dir}/util/drop_and_create_db.sh" --template mytemplate

bash "${this_dir}"/fixtures.sh
geoserver_delete_workspace
geoserver_create_workspace
geoserver_create_postgis_datastore
geoserver_create_layer poi poi
geoserver_create_layer fake_poi fake_poi

echo ""
green "DONE"
