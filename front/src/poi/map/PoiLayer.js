import {msg, t} from "@lingui/macro";
import {i18n} from "@lingui/core";
import {useMapGeojsonLayerConfig} from "base/map/layer";
import {useGeojsonLayer} from "base/map/leaflet/layer";
import {createLayerLegend, createWMSLegendIcon} from "base/map/legend";
import {usePoiCategoryUtil} from "poi/utils";

const popup = feature => {
    let data = feature.properties;
    let popupContent = `<b>${data["name"] ? data["name"] : "---"}</b>`;
    popupContent += "<ul class='attributes'>";
    popupContent += `<li><i>${i18n._(msg`Municipio`)}</i>: ${data["municipality"] || "-"}</li>`;
    popupContent += `<li><i>${i18n._(msg`Categoría`)}</i>: ${data["category"] || "-"}</li>`;
    popupContent += `<li><i>${i18n._(msg`Tipo`)}</i>: ${data["poi_type"] || "-"}</li>`;
    popupContent += `<li><i>${i18n._(msg`Dirección`)}</i>: ${data["address"] || "-"}</li>`;
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

export function createPoiLayer({
    interactive = true,
    cluster = true,
    fitBounds = false,
}) {
    const {getStyleForCategory} = usePoiCategoryUtil();

    const getStyle = feature => {
        const categoryConfig = getStyleForCategory(feature.properties.category);
        return {
            icon: {
                normal: categoryConfig.mapIcon.normal,
                highlighted: categoryConfig.mapIcon.highlighted,
                selected: categoryConfig.mapIcon.selected,
            },
        };
    };

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

export function usePoiLayerConfig({tocComponent = null} = {}) {
    const poisLayer = createPoiLayer({
        interactive: true,
        cluster: false,
        fitBounds: false,
    });
    const poisLegend = createLayerLegend({
        code: "pois",
        label: t`POI`,
        icon: createWMSLegendIcon({
            type: "square",
        }),
    });

    return useMapGeojsonLayerConfig({
        layer: poisLayer,
        legend: poisLegend,
        tocComponent,
    });
}
