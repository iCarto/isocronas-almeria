import {
    TerraDraw,
    TerraDrawPolygonMode,
    TerraDrawPointMode,
    TerraDrawSelectMode,
} from "terra-draw";
import {TerraDrawLeafletAdapter} from "terra-draw-leaflet-adapter";
import {mapOverlayPanes} from "..";

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
    if (feature?.geometry?.type === "Point") {
        feature.geometry.coordinates = [
            parseFloat(feature.geometry.coordinates[0].toFixed(9)),
            parseFloat(feature.geometry.coordinates[1].toFixed(9)),
        ];
        feature.properties["mode"] = "point";
        return [{...feature, id}];
    }
    return null;
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
    if (feature?.geometry?.type === "Point") {
        delete feature["id"];
        delete feature.properties["mode"];
    }
    return {...feature};
};

export class LayerElementEditable {
    #type;
    #layerRef;
    #geojsonRef;
    #mapRef;
    #drawRef;
    #feature;
    #featureUUID;
    #style;

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

    constructor() {
        this.#layerRef = L.layerGroup();
    }

    create(mapRef, feature, type) {
        this.#mapRef = mapRef;
        this.#feature = feature;
        this.#type = type;
        this.mapRef.current.removeLayer(this.layerRef);
        this.mapRef.current.addLayer(this.layerRef);

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
                new TerraDrawPointMode({
                    styles: {
                        pointColor: defaultDrawColor,
                    },
                }),
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
                        selectedPointColor: defaultDrawColor,
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

    openEdition() {
        this.drawRef.start();

        if (
            this.feature?.geometry?.coordinates &&
            this.feature.geometry.coordinates.length
        ) {
            // if edition
            console.log("editing", this.feature);
            this.#featureUUID = this.drawRef.getFeatureId();
            const features = formatDrawFeatures(this.featureUUID, this.feature);
            console.log({features});
            this.drawRef.addFeatures(features);
            this.drawRef.setMode("select");
            this.drawRef.selectFeature(this.#featureUUID);
        } else {
            // if creation
            //this.drawRef.setMode("point");
            console.log("type", this.type);
            if (this.type === "polygon") {
                this.drawRef.setMode("polygon");
            }
            if (this.type === "point") {
                const center = this.mapRef.current.getBounds().getCenter();
                this.#featureUUID = this.drawRef.getFeatureId();
                const newFeature = {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [center.lng, center.lat],
                    },
                    properties: {
                        mode: "point",
                    },
                };
                const features = formatDrawFeatures(this.featureUUID, newFeature);
                console.log("creating", {features});
                this.drawRef.addFeatures(features);
                this.drawRef.setMode("select");
                this.drawRef.selectFeature(this.#featureUUID);
            }
        }
    }

    closeEdition() {
        this.drawRef.stop();
        this.#feature = null;
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

export function useLayerElementEditable() {
    console.log("CARTO >> Creating editable layer object");
    return new LayerElementEditable();
}
