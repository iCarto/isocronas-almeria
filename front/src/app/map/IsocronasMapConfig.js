/*
Es útil que esto sea un Hook en vez de un fichero de configuración, porque así podemos decidir en tiempo de ejecución la configuración del mapa.
*/
export function useIsocronasMapConfig() {
    /* const crs = {
        code: "EPSG:32632",
        proj4: "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs +type=crs", // https://spatialreference.org/ref/epsg/32632/proj4.txt
        options: {
            resolutions: [
                1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625,
                0.03125,
            ],
            //Origen de servicio teselado
            //origin:[0,0]
        },
    };

    const crsType = {
        type: "name",
        properties: {
            name: "urn:ogc:def:crs:EPSG::32632",
        },
    }; */

    const crs = null;
    const crsType = null;

    const baseLayers = [
        {
            code: "osm-hot",
            name: "OpenStreetMap - HOT",
            isWms: false,
            url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
            options: {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
            },
        },
        {
            code: "esri-satellite",
            name: "ESRI Satellite",
            isWms: true,
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            options: {
                attribution:
                    "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, CNES/Airbus DS, USDA FSA, USGS, Aerogrid, IGN, IGP, and the GIS User Community",
            },
        },
        /*
        {
            code: "topo-mundialis",
            name: "TOPO - Mundialis",
            isWms: true,
            url: "http://ows.mundialis.de/services/service?'",
            options: {
                layers: "TOPO-OSM-WMS",
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                crs: L.CRS.EPSG32736, // TODO: Remove this dependency to L (leaflet)
            },
        },
        {
            code: "opentopomap",
            name: "OpenTopoMap",
            isWms: false,
            url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
            options: {
                attribution:
                    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
            },
        }, */
    ];

    const mapOptions = {
        minZoom: 5,
        maxZoom: 18,
        center: [-26.479274, 31.512005],
        zoom: 9,
    };

    const tocOptions = {
        buffer: {show: false},
        image: {show: true},
    };

    return {crs, crsType, baseLayers, mapOptions, tocOptions};
}
