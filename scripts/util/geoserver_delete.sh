#!/bin/bash

geoserver_delete_this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
source "${geoserver_delete_this_dir}"/../../server/variables.ini

# Delete a geoserver resource recursively
geoserver_delete_resource() {
    local resource_url=$1
    curl -u "${GEOSERVER_USER}:${GEOSERVER_PASS}" -X DELETE "${resource_url}"
}
# Delete geoserver workspace recursively
geoserver_delete_workspace() {
    geoserver_delete_resource "${GEOSERVER_URL}/rest/workspaces/${GEOSERVER_WORKSPACE_NAME}?recurse=true"
    # echo "Workspace '${GEOSERVER_WORKSPACE_NAME}' and its associated datastores and layers have been removed."
}

# Delete the layers inside a geoserver workspace
geoserver_delete_workspace_layers() {
    layers=$(curl -u "${GEOSERVER_USER}":"${GEOSERVER_PASS}" -s "${GEOSERVER_URL}/rest/layers?workspace=${GEOSERVER_WORKSPACE_NAME}" | grep -oP '(?<=<name>).*?(?=</name>)')
    for layer in ${layers}; do
        geoserver_delete_resource "${GEOSERVER_URL}/rest/layers/${layer}"
    done
}

# Delete the datastores inside a geoserver workspace
geoserver_delete_datastores() {
    datastores=$(curl -u "${GEOSERVER_USER}":"${GEOSERVER_PASS}" -s "${GEOSERVER_URL}/rest/workspaces/${GEOSERVER_WORKSPACE_NAME}/datastores" | grep -oP '(?<=<name>).*?(?=</name>)')
    for datastore in ${datastores}; do
        geoserver_delete_resource "${GEOSERVER_URL}/rest/workspaces/${GEOSERVER_WORKSPACE_NAME}/datastores/${datastore}"
    done
}
