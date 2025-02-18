import {useMapContext} from "base/map";
import {createContext, useContext, useEffect, useState} from "react";

let MapWMSLayerContext = createContext(null);

const getCodes = (legend, validateDefaultValue = false) => {
    if (validateDefaultValue && !legend.visible) return [];
    if (!legend.children) return [legend.code];
    return [
        legend.code,
        ...legend.children.map(child => getCodes(child, validateDefaultValue)),
    ].flat(Infinity);
};

const getCheckedLayerCodes = (legend, checkedLayers) => {
    if (!checkedLayers.includes(legend.code)) {
        return [];
    }
    if (!legend.children) {
        return [...legend.layerCodes];
    }
    return [
        ...legend.layerCodes,
        ...legend.children.map(child => getCheckedLayerCodes(child, checkedLayers)),
    ].flat(Infinity);
};

const findLegend = (code, array = []) => {
    if (!array) return false;
    let node;
    array.some(
        object =>
            (node =
                object["code"] === code ? object : findLegend(code, object.children))
    );
    return node;
};

export default function MapWMSLayerProvider({layerConfig, children}) {
    const {load, layer, legend} = layerConfig;
    const {mapObjectRef} = useMapContext();

    const [visible, setVisible] = useState(true);

    const defaultCheckedLayers = getCodes(legend, true);
    const [checkedLayers, setCheckedLayers] = useState(defaultCheckedLayers);

    useEffect(() => {
        console.log("CARTO >> Creating layer", {layer});
        const layerCodesToShow = getCheckedLayerCodes(legend, checkedLayers);
        layer.create(mapObjectRef, load, layerCodesToShow);
    }, []);

    useEffect(() => {
        console.log("CARTO >> Changing layer visibility", {visible});
        visible ? layer.show() : layer.hide();
    }, [visible]);

    useEffect(() => {
        const layerCodesToShow = getCheckedLayerCodes(legend, checkedLayers);
        console.log("CARTO >> Changing sub-layers visibility", {
            layerCodesToShow,
        });
        layer.update(load, layerCodesToShow);
    }, [checkedLayers]);

    const setCheckedLayer = (layerCode, checked) => {
        console.log("CARTO >> Set checked layer", {layerCode}, {checked});
        const legendFound = findLegend(layerCode, legend.children || []);
        const layersFromLegend = getCodes(legendFound);
        if (checked) {
            setCheckedLayers([...checkedLayers, ...layersFromLegend]);
        } else {
            setCheckedLayers(
                checkedLayers.filter(
                    layerCodeAux => !layersFromLegend.includes(layerCodeAux)
                )
            );
        }
    };

    return (
        <MapWMSLayerContext.Provider
            value={{
                layerConfig,
                visible,
                setVisible,
                checkedLayers,
                setCheckedLayer,
            }}
        >
            {children}
        </MapWMSLayerContext.Provider>
    );
}
const useMapWMSLayerProviderContext = () => {
    return useContext(MapWMSLayerContext);
};

export {useMapWMSLayerProviderContext};
