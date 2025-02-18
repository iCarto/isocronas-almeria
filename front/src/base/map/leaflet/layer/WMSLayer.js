import {useRef} from "react";
import L from "leaflet";
import {mapOverlayPanes} from "..";

export class WMSLayer {
    #layerRef;
    #mapRef;
    #format;
    #opacity;
    #pane;
    #otherLayerOptions;

    get layerRef() {
        return this.#layerRef;
    }

    get mapRef() {
        return this.#mapRef;
    }

    get format() {
        return this.#format;
    }

    get opacity() {
        return this.#opacity;
    }

    get pane() {
        return this.#pane;
    }

    get otherLayerOptions() {
        return this.#otherLayerOptions;
    }

    constructor(format, opacity, pane, otherLayerOptions) {
        this.#layerRef = useRef(L.layerGroup());
        this.#format = format;
        this.#opacity = opacity;
        this.#pane = pane;
        this.#otherLayerOptions = otherLayerOptions;
    }

    create(mapRef, url, layers) {
        console.log("CARTO >> Creating tile layer", mapRef);
        if (mapRef) {
            this.#mapRef = mapRef;
            this.mapRef.current.removeLayer(this.layerRef.current);
            const layerOptions = {
                layers: layers.join(","),
                format: this.format,
                opacity: this.opacity,
                pane: mapOverlayPanes[this.pane],
                ...this.otherLayerOptions,
            };
            this.layerRef.current = L.tileLayer.wms(url, layerOptions);
            if (layerOptions.tiled) {
                this.layerRef.current.setParams({tiled: true}, true);
            }
            this.mapRef.current.addLayer(this.layerRef.current);
        }
    }

    update(url, layers) {
        console.log("CARTO >> Updating tile layer");
        this.mapRef.current.removeLayer(this.layerRef.current);
        const layerOptions = {
            layers: layers.join(","),
            format: this.format,
            opacity: this.opacity,
            pane: mapOverlayPanes[this.pane],
            ...this.otherLayerOptions,
        };
        this.layerRef.current = L.tileLayer.wms(url, layerOptions);
        this.mapRef.current.addLayer(this.layerRef.current);
    }

    clear() {
        if (this.mapRef && this.mapRef.current) {
            this.mapRef.current.removeLayer(this.layerRef.current);
        }
    }

    show() {
        console.log("CARTO >> Showing tile layer");
        this.mapRef.current.addLayer(this.layerRef.current);
    }

    hide() {
        console.log("CARTO >> Hiding tile layer");
        this.mapRef.current.removeLayer(this.layerRef.current);
    }
}

export function useWMSLayer({
    format = null,
    pane = null,
    opacity = null,
    otherLayerOptions = null,
}) {
    return new WMSLayer(format, opacity, pane, otherLayerOptions);
}
