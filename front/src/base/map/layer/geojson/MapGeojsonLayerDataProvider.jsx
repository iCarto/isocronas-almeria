import {createContext, useContext, useEffect, useState} from "react";
import {useMapGeojsonLayerContext} from ".";
import {useMapContext} from "base/map";
import {useDownload} from "base/file/utilities";
import {ErrorUtil} from "base/error/utilities";
import {ServiceRequestFormat} from "base/api/utilities";

let MapGeojsonLayerDataContext = createContext(null);

export default function MapGeojsonLayerDataProvider({children}) {
    const {mapObjectRef, mapFilter, mapCRSType} = useMapContext();
    const {
        layerConfig: {load, layer, onSelectedItem},
    } = useMapGeojsonLayerContext();

    const download = useDownload();

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
        console.log("CARTO >> Changing filter", {mapFilter});
        loadData({...mapFilter});
    }, [mapFilter]);

    useEffect(() => {
        console.log("CARTO >> Changing layer items", {items: featureCollection});
        if (!featureCollection["crs"]) {
            featureCollection["crs"] = mapCRSType;
        }
        layer.update(featureCollection);
    }, [featureCollection]);

    const loadData = filter => {
        setLoading(true);
        setError(null);
        console.log("CARTO >> Loading data", {filter});
        const loadDataCall =
            typeof load === "function"
                ? load({...filter})
                : load.getFeatures({...filter});
        loadDataCall
            .then(response => {
                setFeatureCollection(response);
            })
            .catch(error => {
                ErrorUtil.handleError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const downloadData = (format = ServiceRequestFormat.SHP) => {
        /* service
            .getList(mapFilter, null, null, format)
            .then(response => {
                download(response);
            })
            .catch(error => {
                console.log({error});
            }); */
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
        <MapGeojsonLayerDataContext.Provider
            value={{
                elements: featureCollection,
                loading,
                error,
                selectedItem,
                setSelectedItem,
            }}
        >
            {children}
        </MapGeojsonLayerDataContext.Provider>
    );
}
const useMapGeojsonLayerDataContext = () => {
    return useContext(MapGeojsonLayerDataContext);
};

export {useMapGeojsonLayerDataContext};
