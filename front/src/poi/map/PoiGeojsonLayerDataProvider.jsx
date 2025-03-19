import {createContext, useContext, useEffect, useState} from "react";
import {useMapContext} from "base/map";
import {ErrorUtil} from "base/error/utilities";
import {useMapGeojsonLayerContext} from "base/map/layer/geojson";
import {usePoisIsochroneContext} from ".";
import {PoiRepository} from "poi/repository";
import {useTurfUtil} from "base/geo/turf";

let PoiGeojsonLayerDataContext = createContext(null);

export default function PoiGeojsonLayerDataProvider({children}) {
    const {mapObjectRef, mapCRSType} = useMapContext();
    const {
        layerConfig: {layer, onSelectedItem},
    } = useMapGeojsonLayerContext();
    const {isochrone, setElements} = usePoisIsochroneContext();
    const {getFilteredFeatures} = useTurfUtil();

    const [featureCollection, setFeatureCollection] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("CARTO >> Creating layer", {layer});
        layer.create(mapObjectRef);
        if (onSelectedItem) {
            layer.setOnClickListener(setSelectedItem);
        }
    }, []);

    useEffect(() => {
        console.log("CARTO >> Changing layer items", {items: featureCollection});
        if (!featureCollection["crs"]) {
            featureCollection["crs"] = mapCRSType;
        }
        layer.update(featureCollection);
    }, [featureCollection]);

    useEffect(() => {
        console.log("CARTO >> Changing isochrone", {isochrone});
        loadData(isochrone);
    }, [isochrone]);

    const loadData = isochrone => {
        if (!isochrone) {
            setFeatureCollection({});
            return Promise.resolve({});
        }
        setLoading(true);
        setError(null);

        return PoiRepository.getFeatures()
            .then(features => {
                const elements = getFilteredFeatures(features, isochrone);
                setElements(elements.features.map(feature => feature));
                return elements;
            })
            .then(response => {
                console.log({response});
                setFeatureCollection(response);
            })
            .catch(error => {
                ErrorUtil.handleError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (selectedItem) {
            console.log("CARTO >> Selecting element", {selectedItem});
            layer.setSelectedId(selectedItem);
            if (onSelectedItem) {
                onSelectedItem(selectedItem);
            }
        }
    }, [selectedItem]);

    return (
        <PoiGeojsonLayerDataContext.Provider
            value={{
                elements: featureCollection,
                loading,
                error,
                selectedItem,
                setSelectedItem,
            }}
        >
            {children}
        </PoiGeojsonLayerDataContext.Provider>
    );
}
const usePoiGeojsonLayerDataContext = () => {
    return useContext(PoiGeojsonLayerDataContext);
};

export {usePoiGeojsonLayerDataContext};
