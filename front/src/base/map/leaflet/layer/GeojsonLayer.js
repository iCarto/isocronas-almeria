import {useRef} from "react";
import L from "leaflet";
import {mapOverlayPanes} from "..";
import {GeojsonClusterLayer, GeojsonDiscriminatorUtil} from ".";
import {GeojsonUtil} from "base/map/utilities";

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
                style: () => {
                    const style = {
                        ...defaultPolygonStyle,
                        ...this.style,
                        pane: mapOverlayPanes[this.pane],
                    };
                    return style;
                },
                pointToLayer: (feature, latlng) => {
                    return new L.CircleMarker(latlng, {
                        ...defaultPointStyle,
                        ...this.style,
                    });
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

            this.reload();
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
                // highlight selected option
                if (this.selectedId && this.selectedId === layer.feature.id) {
                    layer.setStyle({
                        ...layer.options,
                        weight: 3,
                        color: "orange",
                    });
                } else {
                    layer.setStyle({
                        ...defaultPolygonStyle,
                        ...this.style,
                    });
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
