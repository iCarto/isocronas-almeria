import {createContext, useContext, useEffect, useState} from "react";

let MapGeojsonLayerContext = createContext(null);

export default function MapGeojsonLayerProvider({layerConfig, children}) {
    const {layer} = layerConfig;

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        console.log("CARTO >> Changing layer visibility", {visible});
        visible ? layer.show() : layer.hide();
    }, [visible]);

    return (
        <MapGeojsonLayerContext.Provider value={{layerConfig, visible, setVisible}}>
            {children}
        </MapGeojsonLayerContext.Provider>
    );
}
const useMapGeojsonLayerContext = () => {
    return useContext(MapGeojsonLayerContext);
};

export {useMapGeojsonLayerContext};
