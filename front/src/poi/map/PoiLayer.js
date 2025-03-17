import {msg, t} from "@lingui/macro";
import {i18n} from "@lingui/core";
import {useMapGeojsonLayerConfig} from "base/map/layer";
import {useGeojsonLayer} from "base/map/leaflet/layer";
import {createLayerLegend, createWMSLegendIcon} from "base/map/legend";
import {PoiRepository} from "poi/repository";
import {usePoisIsochroneContext} from ".";
import {useTurfUtil} from "base/geo/turf";

const popup = feature => {
    let data = feature.properties;
    let popupContent = `<b>${data["name"] ? data["name"] : "---"}</b>`;
    popupContent += "<ul class='attributes'>";
    popupContent += `<li><i>${i18n._(msg`Category`)}</i>: ${data["category"] || "-"}</li>`;
    popupContent += `<li><i>${i18n._(msg`Municipality`)}</i>: ${data["municipality"] || "-"}</li>`;
    popupContent += "</ul>";
    // popupContent += `<div style="width: 100%; text-align: center;"><a href='/poi/all/list/${
    //     feature.id
    // }/summary' target="_blank">${i18n._(msg`View POI`)}</a></div>`;
    return popupContent;
};

const defaultStyle = {
    color: "#28a745",
    fillColor: "#28a745cc",
    weight: 1,
    radius: 2,
};

const getStyleForCategory = category => {
    switch (category) {
        case "Finanzas":
            return {
                color: "#FFD700",
                icon: "",
            };
        case "Salud y bienestar":
            return {
                color: "#FF6347",
                icon: "",
            };
        case "Alimentación y bebidas":
            return {
                color: "#FF8C00",
                icon: "",
            };
        case "Compras":
            return {
                color: "#32CD32",
                icon: "",
            };
        case "Entretenimiento y ocio":
            return {
                color: "#8A2BE2",
                icon: "",
            };
        case "Cultura y educación":
            return {
                color: "#1E90FF",
                icon: "",
            };
        case "Gobierno e instituciones":
            return {
                color: "#2F4F4F",
                icon: "",
            };
        case "Transporte":
            return {
                color: "#4682B4",
                icon: "",
            };
        case "Alojamiento":
            return {
                color: "#DA70D6",
                icon: "",
            };
        case "Lugares de culto":
            return {
                color: "#A52A2A",
                icon: "",
            };
        case "Espacios naturales":
            return {
                color: "#228B22",
                icon: "",
            };
        case "Automoción":
            return {
                color: "#B22222",
                icon: "",
            };
        case "Servicios":
            return {
                color: "#FF4500",
                icon: "",
            };
        case "Deportes":
            return {
                color: "#20B2AA",
                icon: "",
            };
        case "Turismo":
            return {
                color: "#4169E1",
                icon: "",
            };
        default:
            return {
                color: "#333333",
                icon: "",
            };
    }
};

const getStyle = feature => {
    const color = getStyleForCategory(feature.properties.category).color;
    return {
        ...defaultStyle,
        color: color,
        fillColor: color,
    };
};

export function createPoiLayer({
    interactive = true,
    cluster = true,
    fitBounds = false,
}) {
    return useGeojsonLayer({
        type: "point",
        cluster: cluster
            ? {
                  zoomStop: 11,
              }
            : null,
        style: getStyle,
        popup: popup,
        pane: 7,
        interactive,
        fitBounds,
    });
}

export function createPoiLegend() {
    return createLayerLegend({
        code: "poi",
        label: i18n._(msg`POI`),
        icon: createWMSLegendIcon({
            type: "square",
        }),
    });
}

export function createPoiLayerConfig({label = t`POI`, fitBounds = false} = {}) {
    const {getFilteredFeatures} = useTurfUtil();

    const poisLayer = createPoiLayer({
        interactive: true,
        cluster: false,
        fitBounds,
    });
    const poisLegend = createLayerLegend({
        code: "pois",
        label,
        icon: createWMSLegendIcon({
            type: "square",
        }),
    });

    return useMapGeojsonLayerConfig({
        load: filter => {
            return PoiRepository.getFeatures(filter).then(features => {
                return getFilteredFeatures(features, filter.isochrone);
            });
        },
        layer: poisLayer,
        legend: poisLegend,
        discriminators: [],
    });
}
