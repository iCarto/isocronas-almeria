import {msg, t} from "@lingui/macro";
import {i18n} from "@lingui/core";
import {useMapGeojsonLayerConfig} from "base/map/layer";
import {useGeojsonLayer} from "base/map/leaflet/layer";
import {createLayerLegend, createWMSLegendIcon} from "base/map/legend";
import {IsochroneRepository} from "poi/repository";
import {usePoisIsochroneContext} from ".";
import {useTurfUtil} from "base/geo/turf";

function createIsochroneLayer({interactive = false, fitBounds = false}) {
    return useGeojsonLayer({
        type: "polygon",
        style: {
            color: "#2e85cb",
            fillColor: "#999",
            fillOpacity: 0.5,
            weight: 2,
        },
        pane: 6,
        interactive,
        fitBounds,
    });
}

function createIsochroneLegend() {
    return createLayerLegend({
        code: "isochrone",
        label: i18n._(msg`Isocrona`),
        icon: createWMSLegendIcon({
            type: "circle",
        }),
    });
}

export function useIsochroneLayerConfig({label = t`Isocrona`, fitBounds = false} = {}) {
    const {setIsochrone} = usePoisIsochroneContext();
    const {getPolygon, getDifference} = useTurfUtil();

    const isochroneLayer = createIsochroneLayer({
        interactive: true,
        fitBounds,
    });
    const isochroneLegend = createIsochroneLegend();

    return useMapGeojsonLayerConfig({
        load: filter => {
            if (!filter.selected_point || !filter.transport || !filter.travel_time) {
                return Promise.resolve({});
            }
            return IsochroneRepository.getFeatures(filter).then(isochrone => {
                console.log("CALLING TO UPDATE ISOCHRONE", {isochrone});
                setIsochrone(isochrone);

                const envelope = getPolygon([
                    [
                        [-7.0, 33.0],
                        [-7.0, 40.0],
                        [2.0, 40.0],
                        [2.0, 33.0],
                        [-7.0, 33.0],
                    ],
                ]);

                return getDifference([envelope, isochrone.features[0]]);
            });
        },
        layer: isochroneLayer,
        legend: isochroneLegend,
        discriminators: [],
    });
}
