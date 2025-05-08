#!/bin/bash

geoserver_this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
source "${geoserver_this_dir}"/../../scripts/variables.ini

geoserver_create_resource() {
    local resource_url=$1
    local resource_data=$2
    curl -s -S -u "${GEOSERVER_USER}:${GEOSERVER_PASS}" -XPOST -H "Content-type: text/xml" \
        -d "${resource_data}" \
        "${resource_url}"
}

geoserver_create_workspace() {
    geoserver_create_resource "${GEOSERVER_URL}/rest/workspaces" "<workspace><name>${GEOSERVER_WORKSPACE_NAME}</name></workspace>"
}

geoserver_create_postgis_datastore() {
    geoserver_create_resource "${GEOSERVER_URL}/rest/workspaces/${GEOSERVER_WORKSPACE_NAME}/datastores" \
        "<dataStore>
            <name>${GEOSERVER_DATASTORE_NAME}</name>
            <connectionParameters>
                <host>${PG_HOST}</host>
                <port>${PG_PORT}</port>
                <database>${DBNAME}</database>
                <user>${PG_USER}</user>
                <passwd>${PG_PASS}</passwd>
                <dbtype>postgis</dbtype>
            </connectionParameters>
        </dataStore>"
}

geoserver_create_layer() {
    local GEOSERVER_LAYER_NAME="${1:-poi}"
    local PG_TABLE_NAME="${2:-poi}"
    geoserver_create_resource \
        "${GEOSERVER_URL}/rest/workspaces/${GEOSERVER_WORKSPACE_NAME}/datastores/${GEOSERVER_DATASTORE_NAME}/featuretypes" \
        "<featureType>
            <name>${GEOSERVER_LAYER_NAME}</name>
            <nativeName>${PG_TABLE_NAME}</nativeName>
        </featureType>"

    # "<featureType>
    #     <name>${GEOSERVER_LAYER_NAME}</name>
    #     <srs>EPSG:4326</srs>
    # </featureType>"
}

# # Enable WFS and WMS for the layer
# curl -u "${GEOSERVER_USER}:${GEOSERVER_PASS}" -XPUT -H "Content-type: text/xml" \
#     -d "<layer>
#                 <enabled>true</enabled>
#                 <defaultStyle>
#                     <name>point</name>
#                 </defaultStyle>
#                 <resource class=\"featureType\" href=\"${GEOSERVER_URL}/rest/workspaces/${GEOSERVER_WORKSPACE_NAME}/datastores/${DATASTORE_NAME}/featuretypes/${LAYER_NAME}.xml\"/>
#             </layer>" \
#     "${GEOSERVER_URL}/rest/layers/${GEOSERVER_WORKSPACE_NAME}:${LAYER_NAME}"

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
