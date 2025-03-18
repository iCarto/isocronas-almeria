import {msg, t} from "@lingui/macro";
import {i18n} from "@lingui/core";
import {useMapGeojsonLayerConfig} from "base/map/layer";
import {useGeojsonLayer} from "base/map/leaflet/layer";
import {createLayerLegend, createWMSLegendIcon} from "base/map/legend";
import {PoiRepository} from "poi/repository";
import {usePoisIsochroneContext} from ".";
import {useTurfUtil} from "base/geo/turf";
import {usePoiCategoryUtil} from "poi/utils";

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

export function createPoiLayer({
    interactive = true,
    cluster = true,
    fitBounds = false,
}) {
    const {getStyleForCategory} = usePoiCategoryUtil();

    const getStyle = feature => {
        const color = getStyleForCategory(feature.properties.category).color;
        console.log({color});
        return {
            ...defaultStyle,
            color: color,
            fillColor: color,
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

export function createPoiLayerConfig({tocComponent = null} = {}) {
    const {getFilteredFeatures} = useTurfUtil();
    const {setElements} = usePoisIsochroneContext();

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
        load: filter => {
            return PoiRepository.getFeatures(filter).then(features => {
                const elements = getFilteredFeatures(features, filter.isochrone);
                setElements(elements.features.map(feature => feature));
                return elements;
            });
        },
        layer: poisLayer,
        legend: poisLegend,
        discriminators: [],
        tocComponent,
    });
}
