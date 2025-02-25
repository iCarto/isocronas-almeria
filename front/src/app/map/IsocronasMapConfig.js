/*
Es útil que esto sea un Hook en vez de un fichero de configuración, porque así podemos decidir en tiempo de ejecución la configuración del mapa.
*/
export function useIsocronasMapConfig() {
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
            code: "pnoa-ortoimagen",
            name: "PNOA Ortoimagen",
            isWms: true,
            url: "http://www.ign.es/wms-inspire/pnoa-ma",
            options: {
                layers: "OI.OrthoimageCoverage",
                format: "image/png",
                transparent: false,
                continuousWorld: true,
                attribution:
                    'PNOA cedido por © <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geográfico Nacional de España</a>',
            },
        },
    ];

    const mapOptions = {
        minZoom: 5,
        maxZoom: 18,
        center: [37.203228, -2.293171],
        zoom: 9,
    };

    const tocOptions = {
        buffer: {show: false},
        image: {show: false},
    };

    return {crs, crsType, baseLayers, mapOptions, tocOptions};
}
