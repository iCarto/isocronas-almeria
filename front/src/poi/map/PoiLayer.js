import {msg, t} from "@lingui/macro";
import {i18n} from "@lingui/core";
import {useMapGeojsonLayerConfig} from "base/map/layer";
import {useGeojsonLayer} from "base/map/leaflet/layer";
import {createLayerLegend, createWMSLegendIcon} from "base/map/legend";
import {PoiRepository} from "poi/repository";

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

export function createPoiLayer({
    interactive = true,
    cluster = true,
    fitBounds = false,
}) {
    return useGeojsonLayer({
        type: "polygon",
        cluster: cluster
            ? {
                  zoomStop: 11,
              }
            : null,
        style: {
            color: "#28a745",
            fillColor: "#28a745cc",
            weight: 2,
        },
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
    const poisLayer = createPoiLayer({
        interactive: true,
        cluster: true,
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
            return PoiRepository.getFeatures({
                ...filter,
            });
        },
        layer: poisLayer,
        legend: poisLegend,
        discriminators: [],
    });
}
