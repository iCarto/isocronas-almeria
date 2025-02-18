export function useMapConfig() {
    // crs and crsType should be overriden by project config if necessary
    const crs = null;
    const crsType = null;

    const baseLayers = [
        {
            code: "osm",
            name: "OpenStreetMap",
            isWms: false,
            url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
            options: {
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            },
        },
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
            code: "opentopomap",
            name: "OpenTopoMap",
            isWms: false,
            url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
            options: {
                attribution:
                    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
            },
        },
        {
            code: "map_osm",
            name: "Map OSM",
            url: "https://{s}.basemaps.mapcdn.com/light_all/{z}/{x}/{y}{r}.png",
            useAppCRS: true,
            wmsOptions: {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://map.com/attributions">CARTO</a>',
                subdomains: "abcd",
                maxZoom: 20,
            },
        },
        {
            code: "esri-satellite",
            name: "ESRI Satellite",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            wmsOptions: {
                attribution:
                    "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, CNES/Airbus DS, USDA FSA, USGS, Aerogrid, IGN, IGP, and the GIS User Community",
            },
        },
    ];

    const mapOptions = {
        minZoom: 5,
        maxZoom: 16,
        center: [42.851806, -7.976074],
        zoom: 9,
        zoomSnap: 0,
    };

    const controlOptions = {
        coordinates: {show: true},
        scale: {show: true},
        resetview: {show: true},
    };

    const tocOptions = {
        baseLayer: {show: true},
        buffer: {show: true, values: [1, 2, 5, 10]},
        image: {show: true},
    };

    return {crs, crsType, baseLayers, mapOptions, controlOptions, tocOptions};
}
