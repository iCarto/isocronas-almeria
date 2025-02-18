import {useMapContext} from "base/map";
import {createContext, useContext, useEffect, useState} from "react";

let MapTileLayerContext = createContext(null);

export default function MapTileLayerProvider({layerConfig, children}) {
    const {layer} = layerConfig;
    const {mapObjectRef} = useMapContext();

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        console.log("CARTO >> Creating layer", {layer});
        layer.create(mapObjectRef);
        layer.hide();
        layer.show();
    }, []);

    useEffect(() => {
        console.log("CARTO >> Changing layer visibility", {visible});
        visible ? layer.show() : layer.hide();
    }, [visible]);

    return (
        <MapTileLayerContext.Provider
            value={{
                layerConfig,
                visible,
                setVisible,
            }}
        >
            {children}
        </MapTileLayerContext.Provider>
    );
}
const useMapTileLayerProviderContext = () => {
    return useContext(MapTileLayerContext);
};

export {useMapTileLayerProviderContext};
