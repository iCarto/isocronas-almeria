#!/bin/bash

geoserver_create_this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
source "${geoserver_create_this_dir}"/../../server/variables.ini

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
    geoserver_create_resource \
        "${GEOSERVER_URL}/rest/workspaces/${GEOSERVER_WORKSPACE_NAME}/datastores/${GEOSERVER_DATASTORE_NAME}/featuretypes" \
        "<featureType><name>${GEOSERVER_LAYER_NAME}</name></featureType>"

    # "<featureType>
    #     <name>${GEOSERVER_LAYER_NAME}</name>
    #     <nativeName>${PG_TABLE_NAME}</nativeName>
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
