import {useRef} from "react";
import L from "leaflet";
import {mapOverlayPanes} from "..";
import {GeojsonClusterLayer, GeojsonDiscriminatorUtil} from ".";
import {GeojsonUtil} from "base/map/utilities";
import {createRoot} from "react-dom/client";

const defaultPolygonStyle = {
    color: "#333",
    fillColor: "#aaa",
    fillOpacity: 0.5,
    weight: 1,
    opacity: 1,
};

const defaultPointStyle = {
    radius: 5,
    color: "#333",
    fillColor: "#333",
    fillOpacity: 1,
    weight: 1,
    opacity: 1,
};

export class GeojsonLayer {
    #type;
    #layerRef;
    #geojsonRef;
    #mapRef;
    #style;
    #popup;
    #pane;
    #interactive;
    #discriminator;
    #discriminatorItems;
    #onClick;
    #selectedId;
    #highlightedIds;
    #fitBounds;

    get type() {
        return this.#type;
    }

    get layerRef() {
        return this.#layerRef;
    }

    get geojsonRef() {
        return this.#geojsonRef;
    }

    get mapRef() {
        return this.#mapRef;
    }

    get style() {
        return this.#style;
    }

    get popup() {
        return this.#popup;
    }

    get pane() {
        return this.#pane;
    }

    get interactive() {
        return this.#interactive;
    }

    get discriminator() {
        return this.#discriminator;
    }

    get discriminatorItems() {
        return this.#discriminatorItems;
    }

    get onClick() {
        return this.#onClick;
    }

    get selectedId() {
        return this.#selectedId;
    }

    get highlightedIds() {
        return this.#highlightedIds;
    }

    get fitBounds() {
        return this.#fitBounds;
    }

    constructor(type, style, popup, pane, interactive, fitBounds) {
        this.#type = type;
        this.#layerRef = useRef(L.layerGroup());
        this.#style = style;
        this.#popup = popup;
        this.#pane = pane;
        this.#interactive = interactive;
        this.#fitBounds = fitBounds;
    }

    styleApplied(feature) {
        return typeof this.style === "function" ? this.style(feature) : this.style;
    }

    create(mapRef) {
        this.#mapRef = mapRef;
        this.mapRef.current.removeLayer(this.layerRef.current);
        this.mapRef.current.addLayer(this.layerRef.current);
    }

    update(geojson) {
        this.clear();
        if (GeojsonUtil.hasValidCoordinates(geojson)) {
            this.#geojsonRef = L.Proj.geoJson(geojson, {
                interactive: this.interactive,
                style: feature => {
                    const style = {
                        ...defaultPolygonStyle,
                        ...this.styleApplied(feature),
                        pane: mapOverlayPanes[this.pane],
                    };
                    return style;
                },
                pointToLayer: (feature, latlng) => {
                    // Only for point features
                    // This can have a circle marker style or an icon style
                    const layerStyle = this.styleApplied(feature);
                    if (layerStyle?.icon) {
                        return L.marker(latlng, {
                            icon: layerStyle.icon.normal,
                            pane: mapOverlayPanes[this.pane],
                        });
                    } else {
                        return new L.CircleMarker(latlng, {
                            ...defaultPointStyle,
                            ...layerStyle,
                        });
                    }
                },
                onEachFeature: (feature, layer) => {
                    if (this.popup) {
                        layer.bindPopup(this.popup(feature));
                    }
                    if (this.#onClick) {
                        layer.on("click", () => {
                            console.log("CARTO >> Click: ", feature.id);
                            this.onClick(feature.id);
                        });
                    }
                },
            });
            this.geojsonRef.addTo(this.layerRef.current);

            if (this.fitBounds && this.geojsonRef.getBounds().isValid()) {
                this.mapRef.current.fitBounds(this.geojsonRef.getBounds(), {
                    padding: [60, 60],
                });
            }
        }
    }

    clear() {
        this.layerRef.current.clearLayers();
    }

    show() {
        this.mapRef.current.addLayer(this.layerRef.current);
    }

    hide() {
        this.mapRef.current.removeLayer(this.layerRef.current);
        this.showTooltips(false);
    }

    showTooltips(visible) {
        if (this.geojsonRef) {
            this.geojsonRef.eachLayer(layer => {
                visible ? layer.openTooltip() : layer.closeTooltip();
            });
        }
    }

    setOnClickListener(onClick) {
        this.#onClick = onClick;
    }

    setDiscriminator(discriminator) {
        this.#discriminator = discriminator;
        this.reload();
    }

    setDiscriminatorItems(discriminatorItems) {
        this.#discriminatorItems = discriminatorItems;
        this.reload();
    }

    setSelectedId(selectedId) {
        this.#selectedId = selectedId;
        this.reload();
    }

    setHighlightedIds(highlightedIds) {
        this.#highlightedIds = highlightedIds;
        //this.reload();
    }

    reload() {
        if (this.geojsonRef) {
            this.geojsonRef.eachLayer(layer => {
                if (this.discriminator) {
                    GeojsonDiscriminatorUtil.applyDiscriminatorStyle(
                        layer,
                        this.discriminator,
                        this.discriminatorItems,
                        {...defaultPolygonStyle, ...this.style}
                    );
                }
                const layerStyle = this.styleApplied(layer.feature);
                // TODO (egago): refactor to separate paint logic for every type
                if (layer instanceof L.Polygon) {
                    if (this.selectedId && this.selectedId === layer.feature.id) {
                        layer.setStyle({
                            ...layer.options,
                            weight: 3,
                            color: "orange",
                        });
                    } else if (
                        this.highlightedIds &&
                        this.highlightedIds.includes(layer.feature.id)
                    ) {
                        layer.setStyle({
                            ...defaultPolygonStyle,
                            ...this.styleApplied(layer.feature),
                        });
                    } else {
                        layer.setStyle({
                            ...defaultPolygonStyle,
                            ...this.styleApplied(layer.feature),
                        });
                    }
                } else if (layer instanceof L.CircleMarker) {
                    if (this.selectedId && this.selectedId === layer.feature.id) {
                        layer.setStyle({
                            ...layer.options,
                            weight: 3,
                            color: "orange",
                        });
                    } else if (
                        this.highlightedIds &&
                        this.highlightedIds.includes(layer.feature.id)
                    ) {
                        layer.setStyle({
                            ...defaultPointStyle,
                            ...this.styleApplied(layer.feature),
                            weight: 6,
                            color: "red",
                        });
                    } else {
                        layer.setStyle({
                            ...defaultPointStyle,
                            ...this.styleApplied(layer.feature),
                        });
                    }
                } else {
                    const latlng = layer.getLatLng();
                    this.geojsonRef.removeLayer(layer);
                    let newLayer;
                    if (this.selectedId && this.selectedId === layer.feature.id) {
                        newLayer = L.marker(latlng, {
                            icon: layerStyle.icon.selected,
                            pane: mapOverlayPanes[this.pane + 1],
                        });
                    } else if (
                        this.highlightedIds &&
                        this.highlightedIds.includes(layer.feature.id)
                    ) {
                        newLayer = L.marker(latlng, {
                            icon: layerStyle.icon.highlighted,
                            pane: mapOverlayPanes[this.pane + 1],
                        });
                    } else {
                        newLayer = L.marker(layer.getLatLng(), {
                            icon: layerStyle.icon.normal,
                            pane: mapOverlayPanes[this.pane],
                        });
                    }
                    newLayer.feature = layer.feature;

                    this.geojsonRef.addLayer(newLayer);
                }
            });
        }
    }
}

export function useGeojsonLayer({
    type,
    style = null,
    popup = null,
    pane = null,
    fitBounds = false,
    cluster = null,
    interactive = true,
}) {
    console.log("CARTO >> Creating layer object");
    if (cluster) {
        return new GeojsonClusterLayer(
            type,
            style,
            popup,
            pane,
            interactive,
            cluster.zoomStop,
            fitBounds
        );
    }
    return new GeojsonLayer(type, style, popup, pane, interactive, fitBounds);
}
