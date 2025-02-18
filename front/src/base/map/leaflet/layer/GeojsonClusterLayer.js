import {useRef} from "react";
import L from "leaflet";
import {mapOverlayPanes} from "..";
import {GeojsonDiscriminatorUtil} from ".";

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

export class GeojsonClusterLayer {
    #type;
    #individualLayersRef;
    #clusterGroupRef;
    #mapRef;
    #style;
    #popup;
    #pane;
    #zoomStop;
    #fitBounds;
    #discriminator;
    #discriminatorItems;
    #onClick;
    #interactive;
    #selectedId;

    get type() {
        return this.#type;
    }

    get individualLayersRef() {
        return this.#individualLayersRef;
    }

    get individualLayers() {
        return this.#individualLayersRef.current;
    }

    get clusterGroupRef() {
        return this.#clusterGroupRef;
    }

    get clusterGroup() {
        return this.#clusterGroupRef.current;
    }

    get mapRef() {
        return this.#mapRef;
    }

    get map() {
        return this.#mapRef.current;
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

    get zoomStop() {
        return this.#zoomStop;
    }

    get fitBounds() {
        return this.#fitBounds;
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

    get interactive() {
        return this.#interactive;
    }

    get selectedId() {
        return this.#selectedId;
    }

    constructor(type, style, popup, pane, interactive, zoomStop, fitBounds) {
        this.#type = type;
        this.#interactive = interactive;
        this.#zoomStop = zoomStop;
        this.#fitBounds = fitBounds;
        this.#individualLayersRef = useRef(L.featureGroup());
        this.#clusterGroupRef = useRef(
            L.markerClusterGroup({
                iconCreateFunction: cluster => {
                    const childCount = cluster.getChildCount();
                    return L.divIcon({
                        html: `<div><span>${childCount}</span></div>`,
                        className: "marker-cluster",
                        iconSize: L.point(40, 40),
                    });
                },
                polygonOptions: {
                    ...style,
                },
            })
        );
        this.#style = style;
        this.#popup = popup;
        this.#pane = pane;
    }

    create(mapRef) {
        this.#mapRef = mapRef;
    }

    update(geojson) {
        this.clear();

        L.Proj.geoJson(geojson, {
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

                // Create a marker for clustering
                let clusterMarker;
                if (feature.geometry.type === "Point") {
                    clusterMarker = L.circleMarker(layer.getLatLng(), {
                        ...defaultPointStyle,
                        ...this.style,
                    });
                } else {
                    const bounds = layer.getBounds();
                    if (bounds.isValid()) {
                        const center = bounds.getCenter();
                        clusterMarker = L.marker(center, {
                            icon: L.divIcon({
                                html: '<div class="polygon-cluster-icon"></div>',
                                className: "polygon-cluster",
                                iconSize: L.point(20, 20),
                            }),
                        });
                    }
                }

                // Bind original layer to the cluster marker
                if (clusterMarker) {
                    clusterMarker.on("click", () => {
                        this.map.fitBounds(layer.getBounds());
                    });

                    // Add the cluster marker to the MarkerClusterGroup
                    this.clusterGroup.addLayer(clusterMarker);
                }
                // Add the original layer to the individual layer group
                this.individualLayers.addLayer(layer);
            },
        });

        if (this.fitBounds && this.individualLayers.getBounds().isValid()) {
            this.map.fitBounds(this.individualLayers.getBounds(), {padding: [60, 60]});
        }
    }

    zoomEndEventFinished() {
        this.updateLayerVisibility();
    }

    moveEndEventFinished() {
        this.reloadMarkersStyle();
    }

    updateLayerVisibility() {
        const zoom = this.map.getZoom();
        if (zoom <= this.zoomStop) {
            this.showLayer(this.clusterGroup, true);
            this.showLayer(this.individualLayers, false);
        } else {
            this.showLayer(this.clusterGroup, false);
            this.showLayer(this.individualLayers, true);
        }
    }

    reloadMarkersStyle() {
        if (this.individualLayersRef && this.map.hasLayer(this.individualLayers)) {
            this.individualLayers.eachLayer(layer => {
                const layerBounds = layer.getBounds();
                // To improve performance, only update markers style inside map bounds
                if (
                    this.discriminator &&
                    layerBounds.isValid() &&
                    this.map.getBounds().contains(layerBounds.getCenter())
                ) {
                    GeojsonDiscriminatorUtil.applyDiscriminatorStyle(
                        layer,
                        this.discriminator,
                        this.discriminatorItems,
                        {...defaultPolygonStyle, ...this.style}
                    );
                }
                // highlight selected option
                this.selectedId && this.selectedId === layer.feature.id
                    ? layer.setStyle({
                          ...layer.options,
                          weight: 3,
                          color: "orange",
                      })
                    : null;
            });
        }
    }

    clear() {
        this.map.off("zoomend", this.zoomEndEventFinished);
        this.map.off("moveend", this.moveEndEventFinished);
        this.clusterGroup.clearLayers();
        this.individualLayers.clearLayers();
    }

    showLayer(layer, show) {
        if (show) {
            if (!this.map.hasLayer(layer)) {
                this.map.addLayer(layer);
            }
        } else {
            if (this.map.hasLayer(layer)) {
                this.map.removeLayer(layer);
            }
        }
    }

    show() {
        this.map.on("zoomend", this.zoomEndEventFinished, this);
        this.map.on("moveend", this.moveEndEventFinished, this);
        this.updateLayerVisibility();
    }

    hide() {
        this.map.off("zoomend", this.zoomEndEventFinished);
        this.map.off("moveend", this.moveEndEventFinished);
        this.showLayer(this.clusterGroup, false);
        this.showLayer(this.individualLayers, false);
    }

    setOnClickListener(onClick) {
        this.#onClick = onClick;
    }

    setDiscriminator(discriminator) {
        this.#discriminator = discriminator;
        this.reloadMarkersStyle();
    }

    setDiscriminatorItems(discriminatorItems) {
        this.#discriminatorItems = discriminatorItems;
        this.reloadMarkersStyle();
    }

    setSelectedId(selectedId) {
        this.#selectedId = selectedId;
        this.reloadMarkersStyle();
    }
}
