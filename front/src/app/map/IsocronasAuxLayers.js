import {useMapLayerConfig} from "base/map/layer";
import {useWMSLayer} from "base/map/leaflet/layer";
import {createWMSLegend} from "base/map/legend";

function createMunicipalitiesLegend() {
    return createWMSLegend({
        code: "base_layers",
        label: "Base Layers",
        children: [
            createWMSLegend({
                code: "AU.AdministrativeUnit",
                layerCodes: ["AU.AdministrativeUnit"],
                label: "AU.AdministrativeUnit",
            }),
        ],
    });
}

function createMunicipalitiesLayer() {
    return useWMSLayer({
        format: "image/png",
        opacity: 1,
        pane: 2,
        otherLayerOptions: {
            tileSize: 2048,
            transparent: true,
            // crs: L.CRS.EPSG32736,
            // minZoom: 8,
            tiled: true,
            styles: "ua-comparador",
        },
    });
}

export function createMunicipalitiesLayerConfig() {
    return useMapLayerConfig({
        load: "https://www.ign.es/wms-inspire/unidades-administrativas",
        layer: createMunicipalitiesLayer(),
        legend: createMunicipalitiesLegend(),
    });
}
