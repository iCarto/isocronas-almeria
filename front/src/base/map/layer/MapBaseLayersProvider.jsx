import {createContext, useContext, useEffect, useRef, useState} from "react";

let MapLayersContext = createContext(null);

export default function MapBaseLayersProvider({
    layers: customLayers = [],
    auxLayers: customAuxLayers = [],
    children,
}) {
    const [layers, setLayers] = useState(customLayers);
    const [auxLayers, setAuxLayers] = useState(customAuxLayers);

    return (
        <MapLayersContext.Provider value={{layers, auxLayers}}>
            {children}
        </MapLayersContext.Provider>
    );
}

const useMapBaseLayersContext = () => {
    return useContext(MapLayersContext);
};

export {useMapBaseLayersContext};
