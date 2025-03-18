import {useMapContext} from "base/map";
import {useLayerElementEditable} from "base/map/leaflet/layer/LayerElementEditable";
import {GeojsonUtil} from "base/map/utilities";
import {createContext, useContext, useEffect, useState} from "react";
import {useMapGeojsonLayerContext} from "./MapGeojsonLayerProvider";

let MapGeojsonLayerFeatureListContext = createContext(null);

export default function MapGeojsonLayerFeatureListProvider({children}) {
    const mapGeoJson = useMapGeojsonLayerContext();

    const [layerConfig, setLayerConfigInternal] = useState(null);
    const [featureCollection, setFeatureCollectionInternal] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const [layerEditable, setLayerEditable] = useState(null);
    const [editable, setEditable] = useState(null);

    const [submitting, setSubmitting] = useState(null);
    const [error, setError] = useState(null);

    const {mapObjectRef} = useMapContext();

    useEffect(() => {
        if (mapGeoJson?.layerConfig) setLayerConfig(mapGeoJson.layerConfig);
    }, [mapGeoJson]);

    const setLayerConfig = newLayerConfig => {
        if (layerConfig) {
            layerConfig.layer.setSelectedId(null);
        }
        if (layerEditable) {
            layerEditable.closeEdition();
        }
        setLayerConfigInternal(newLayerConfig);
    };

    useEffect(() => {
        if (layerEditable) {
            layerEditable.closeEdition();
        }
        if (layerConfig) {
            console.log("layer config changed", {layerConfig});
            layerConfig.layer.setOnClickListener(id => {
                console.log("selected", {id});
                const featureFound = featureCollection.features.find(
                    feature => feature.id === id
                );
                setSelectedItem(featureFound);
            });
            layerConfig.layer.update(featureCollection);
        }
    }, [layerConfig]);

    useEffect(() => {
        if (layerConfig && selectedItem) {
            layerConfig.layer.setSelectedId(selectedItem.id);
        }
    }, [selectedItem]);

    useEffect(() => {
        setError(null);
        if (layerEditable) {
            layerEditable.closeEdition();
        }
        if (selectedItem && editable) {
            const newLayerEditable = useLayerElementEditable();
            console.log(
                "SELECTED item",
                {selectedItem},
                {layerEditable: newLayerEditable}
            );
            newLayerEditable.create(mapObjectRef, selectedItem, layerConfig.layer.type);
            newLayerEditable.openEdition();
            setLayerEditable(newLayerEditable);
        }
    }, [editable]);

    useEffect(() => {
        if (featureCollection) {
            layerConfig.layer.update(featureCollection);
        }
    }, [featureCollection]);

    const setFeatureCollection = data => {
        setFeatureCollectionInternal(GeojsonUtil.convertToCollection(data));
    };

    const handleOpen = (layerConfig, data) => {
        setFeatureCollection(data);
        setLayerConfig(layerConfig);
        setSelectedItem(null);
    };

    const handleClose = () => {
        setFeatureCollectionInternal(null);
        setLayerConfig(null);
        setSelectedItem(null);
    };

    const handleUpdateSubmit = () => {
        setSubmitting(true);
        setError(null);
        const feature = layerEditable.getEditedGeom();
        layerConfig
            .update(selectedItem.id, feature)
            .then(updatedFeature => {
                if (GeojsonUtil.isSingleFeature(featureCollection)) {
                    setFeatureCollection(updatedFeature);
                } else {
                    // replace feature
                    featureCollection["features"] = featureCollection.features.map(
                        feature => {
                            if (feature.id === updatedFeature.id) {
                                return updatedFeature;
                            }
                            return feature;
                        }
                    );
                    setFeatureCollection({...featureCollection});
                }
                setSelectedItem(updatedFeature);
                layerEditable.closeEdition();
                setEditable(false);
            })
            .catch(error => {
                console.log({error});
                setError(error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const handleUpdateDelete = () => {
        setSubmitting(true);
        setError(null);
        layerConfig
            .update(selectedItem.id, {...selectedItem, geometry: null})
            .then(updatedFeature => {
                if (GeojsonUtil.isSingleFeature(featureCollection)) {
                    setFeatureCollection(updatedFeature);
                } else {
                    // replace feature
                    featureCollection["features"] = featureCollection.features.map(
                        feature => {
                            if (feature.id === updatedFeature.id) {
                                return updatedFeature;
                            }
                            return feature;
                        }
                    );
                    setFeatureCollection({...featureCollection});
                }
                setSelectedItem(updatedFeature);
            })
            .catch(error => {
                console.log({error});
                setError(error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <MapGeojsonLayerFeatureListContext.Provider
            value={{
                layerConfig,
                setLayerConfig,
                featureCollection,
                setFeatureCollection,
                selectedItem,
                setSelectedItem,
                editable,
                setEditable,
                handleOpen,
                handleUpdateSubmit,
                handleUpdateDelete,
                submitting,
                error,
                handleClose,
            }}
        >
            {children}
        </MapGeojsonLayerFeatureListContext.Provider>
    );
}
const useMapGeojsonLayerFeatureListContext = () => {
    return useContext(MapGeojsonLayerFeatureListContext);
};

export {useMapGeojsonLayerFeatureListContext};
