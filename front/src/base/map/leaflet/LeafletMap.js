import {useRef} from "react";
import L from "leaflet";
import "proj4leaflet";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "./LeafletMap.css";
import {
    useCoordinatesMapControl,
    useScaleMapControl,
    useResetViewMapControl,
    useSetMarkerMapControl,
} from "./controls";
import {useMapContext} from "../MapProvider";

export const mapOverlayPanes = [...Array(10).keys()].map(i => "overlayPane" + i);

export function useLeafletMap() {
    let baseLayerRef = useRef(null);

    const {mapDOMRef, mapObjectRef, mapCRS, mapOptions, controlOptions} =
        useMapContext();

    const {addCoordinatesMapControl} = useCoordinatesMapControl();
    const {addScaleMapControl} = useScaleMapControl();
    const {addResetViewMapControl} = useResetViewMapControl(
        mapOptions.center,
        mapOptions.zoom
    );
    const {addSetMarkerMapControl} = useSetMarkerMapControl();

    if (mapCRS) {
        mapOptions["crs"] = new L.Proj.CRS(mapCRS.code, mapCRS.proj4, {
            ...mapCRS.options,
        });
    }

    const createMap = () => {
        console.log("CARTO >> Creating map", {mapOptions});
        const map = L.map(mapDOMRef.current, {
            zoomSnap: 0, // http://leafletjs.com/reference.html#map-zoomsnap
            zoomControl: false,
            ...mapOptions,
        });

        L.control
            .zoom({
                position: "topright",
            })
            .addTo(map);

        console.log("CARTO >> Setting map options", {controlOptions});
        if (controlOptions.coordinates?.show) {
            addCoordinatesMapControl(map);
        }
        if (controlOptions.scale?.show) {
            addScaleMapControl(map);
        }
        if (controlOptions.resetview?.show) {
            addResetViewMapControl(map);
        }
        if (controlOptions.setmarker.show) {
            addSetMarkerMapControl(map);
        }

        // Add a series of custom panes for overlay layers
        mapOverlayPanes.forEach((p, i) => {
            map.createPane(p);
            map.getPane(p).style.zIndex = (400 + (i + 1) * 5).toString();
        });

        mapObjectRef.current = map;

        return map;
    };

    const zoomToBbox = bbox => {
        // bbox: [oeste, sur, este, norte]
        console.log("CARTO >> Zooming to bbox", {bbox});
        const bounds = L.latLngBounds([bbox[1], bbox[0]], [bbox[3], bbox[2]]);
        mapObjectRef.current.fitBounds(bounds, {padding: [20, 20]});
    };

    const isMapLoaded = () => mapObjectRef.current._loaded;

    const removeMap = () => {
        console.log("CARTO >> Removing map");
        mapObjectRef.current.remove();
    };

    const setBaseLayer = baseLayer => {
        if (mapObjectRef.current) {
            if (baseLayerRef.current) {
                mapObjectRef.current.removeLayer(baseLayerRef.current);
            }
            console.log("CARTO >> Setting base layer", {baseLayer});
            if (baseLayer) {
                if (baseLayer.isWms) {
                    baseLayerRef.current = L.tileLayer
                        .wms(baseLayer.url, {
                            ...baseLayer.options,
                        })
                        .addTo(mapObjectRef.current);
                } else {
                    baseLayerRef.current = L.tileLayer(baseLayer.url, {
                        ...baseLayer.options,
                    }).addTo(mapObjectRef.current);
                }
            }
        }
    };

    return {createMap, isMapLoaded, removeMap, setBaseLayer, zoomToBbox};
}
