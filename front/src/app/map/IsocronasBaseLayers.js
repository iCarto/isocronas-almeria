import {useWMSLayer} from "base/map/leaflet/layer";
import {createWMSLegend, createWMSLegendIcon} from "base/map/legend";

export const baseLayerUrl = process.env.REACT_APP_SNIMF_BASE_LAYER_URL;

export function createBasePlotLegend() {
    return createWMSLegend({
        code: "capa_base",
        label: "Capas base",
        children: [],
    });
}

export function createBasePlotLayer() {
    return useWMSLayer({
        format: "image/png",
        opacity: 0.5,
        pane: 2,
        otherLayerOptions: {
            tileSize: 512,
            transparent: true,
            // crs: L.CRS.EPSG32736,
            minZoom: 8,
            tiled: true,
        },
    });
}
