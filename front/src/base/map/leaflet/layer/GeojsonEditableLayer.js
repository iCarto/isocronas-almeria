import {useRef} from "react";
import {mapOverlayPanes} from "..";

import {
    TerraDraw,
    TerraDrawPolygonMode,
    TerraDrawPointMode,
    TerraDrawSelectMode,
} from "terra-draw";
import {TerraDrawLeafletAdapter} from "terra-draw-leaflet-adapter";

const defaultDrawColor = "#ff0000";

const uuidv4 = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (
            +c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
        ).toString(16)
    );
};

const formatDrawFeatures = (id, feature) => {
    if (feature?.geometry?.type === "MultiPolygon")
        return feature.geometry.coordinates.map(coords => {
            return {
                id,
                type: "Feature",
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        coords[0].map(point => [
                            parseFloat(point[0].toFixed(9)),
                            parseFloat(point[1].toFixed(9)),
                        ]),
                    ],
                },
                properties: {
                    mode: "polygon",
                    ...feature.properties,
                },
            };
        });
    return {...feature, id};
};

const parseDrawFeatures = feature => {
    if (feature?.geometry?.type === "Polygon") {
        delete feature.properties["mode"];
        return {
            type: "Feature",
            geometry: {
                type: "MultiPolygon",
                coordinates: [feature.geometry.coordinates],
            },
            properties: {
                ...feature.properties,
            },
        };
    }
    return {...feature};
};

export class GeojsonEditableLayer {
    #layerRef;
    #geojsonRef;
    #mapRef;
    #drawRef;
    #feature;
    #featureUUID;
    #style;

    get layerRef() {
        return this.#layerRef;
    }

    get geojsonRef() {
        return this.#geojsonRef;
    }

    get mapRef() {
        return this.#mapRef;
    }

    get drawRef() {
        return this.#drawRef;
    }

    get feature() {
        return this.#feature;
    }

    get featureUUID() {
        return this.#featureUUID;
    }

    get style() {
        return this.#style;
    }

    constructor(style) {
        this.#layerRef = useRef(L.layerGroup());
        this.#style = style;
    }

    create(mapRef) {
        this.#mapRef = mapRef;
        this.mapRef.current.removeLayer(this.layerRef.current);
        this.mapRef.current.addLayer(this.layerRef.current);

        this.#drawRef = new TerraDraw({
            adapter: new TerraDrawLeafletAdapter({map: this.mapRef.current, lib: L}),
            modes: [
                new TerraDrawPolygonMode({
                    styles: {
                        fillColor: defaultDrawColor,
                        fillOpacity: 0.2,
                        outlineColor: defaultDrawColor,
                        outlineWidth: 2,
                    },
                }),
                new TerraDrawPointMode(),
                new TerraDrawSelectMode({
                    flags: {
                        point: {
                            feature: {
                                draggable: true,
                            },
                        },
                        polygon: {
                            feature: {
                                draggable: true,
                                coordinates: {
                                    midpoints: true,
                                    draggable: true,
                                    deletable: true,
                                },
                            },
                        },
                    },
                    styles: {
                        selectionPointColor: defaultDrawColor,
                        selectedPolygonColor: defaultDrawColor,
                        selectedPolygonFillOpacity: 0.2,
                        selectedPolygonOutlineColor: defaultDrawColor,
                        selectedPolygonOutlineWidth: 2,
                        midPointColor: defaultDrawColor,
                    },
                }),
            ],
        });
    }

    update(feature) {
        this.clear();
        if (feature?.geometry?.coordinates && feature.geometry.coordinates.length) {
            this.#feature = feature;
            this.#geojsonRef = L.Proj.geoJson(this.feature, {
                interactive: false,
                style: {
                    fillOpacity: 0.2,
                    ...this.style,
                    pane: mapOverlayPanes[mapOverlayPanes.length - 1],
                },
            });
            this.geojsonRef.addTo(this.layerRef.current);
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
    }

    openEdition() {
        this.drawRef.start();

        if (this.feature) {
            // if edition
            this.#featureUUID = uuidv4();
            const features = formatDrawFeatures(this.featureUUID, this.feature);
            this.drawRef.addFeatures(features);
            this.drawRef.selectFeature(this.featureUUID);
        } else {
            // if creation
            this.drawRef.setMode("polygon");
        }
    }

    closeEdition() {
        this.drawRef.stop();
    }

    getEditedGeom() {
        if (this.featureUUID) {
            // if edition
            const feature = this.drawRef.getSnapshot().find(feature => {
                return feature.id === this.featureUUID;
            });
            return parseDrawFeatures(feature);
        } else {
            // if creation
            return parseDrawFeatures(this.drawRef.getSnapshot()[0]);
        }
    }

    fit() {
        if (this.geojsonRef) {
            this.mapRef.current.fitBounds(this.geojsonRef.getBounds(), {
                padding: [80, 80],
            });
        }
    }
}

export function useGeojsonEditableLayer({style = null}) {
    console.log("CARTO >> Creating editable layer object");
    return new GeojsonEditableLayer(style);
}
