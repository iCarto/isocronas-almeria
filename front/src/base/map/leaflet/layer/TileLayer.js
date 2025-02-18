import {useRef} from "react";
import L from "leaflet";
import {mapOverlayPanes} from "..";

export class TileLayer {
    #layerRef;
    #mapRef;
    #urlTemplate;
    #layers;
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

    get layers() {
        return this.#layers;
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

    constructor(urlTemplate, layers, format, opacity, pane, otherLayerOptions) {
        this.#layerRef = useRef(L.layerGroup());
        this.#urlTemplate = urlTemplate;
        this.#layers = layers;
        this.#format = format;
        this.#opacity = opacity;
        this.#pane = pane;
        this.#otherLayerOptions = otherLayerOptions;
    }

    create(mapRef, checkedLayers) {
        console.log("CARTO >> Creating tile layer", mapRef);
        if (mapRef) {
            this.#mapRef = mapRef;
            this.mapRef.current.removeLayer(this.layerRef.current);
            const layerOptions = {
                layers: checkedLayers.join(","),
                format: this.format,
                opacity: this.opacity,
                pane: mapOverlayPanes[this.pane],
                ...this.otherLayerOptions,
            };
            this.layerRef.current = L.tileLayer.wms(this.#urlTemplate, layerOptions);
            this.mapRef.current.addLayer(this.layerRef.current);
        }
    }

    update(checkedLayers) {
        console.log("CARTO >> Updating tile layer");
        this.mapRef.current.removeLayer(this.layerRef.current);
        const layerOptions = {
            layers: checkedLayers.join(","),
            format: this.format,
            opacity: this.opacity,
            pane: mapOverlayPanes[this.pane],
            ...this.otherLayerOptions,
        };
        this.layerRef.current = L.tileLayer.wms(this.#urlTemplate, layerOptions);
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

export function useTileLayer({
    urlTemplate = null,
    layers = null,
    format = null,
    pane = null,
    opacity = null,
    otherLayerOptions = null,
}) {
    return new TileLayer(urlTemplate, layers, format, opacity, pane, otherLayerOptions);
}
