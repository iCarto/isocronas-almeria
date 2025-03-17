import {createContext, useContext, useEffect, useRef, useState} from "react";
import {useMapConfig} from "./MapConfig";
import {useScopedFilters} from "base/filter/hooks";

let MapContext = createContext(null);

export default function MapProvider({
    crs: customCRS = null,
    crsType: customCRSType = null,
    baseLayers: customBaseLayers = null,
    mapOptions: customMapOptions = {},
    controlOptions: customControlOptions = {},
    tocOptions: customTocOptions = {},
    defaultMapFilter = {},
    children,
}) {
    const {
        crs: defaultCRS,
        crsType: defaultCRSType,
        baseLayers: defaultBaseLayers,
        mapOptions: defaultMapOptions,
        controlOptions: defaultControlOptions,
        tocOptions: defaultTocOptions,
    } = useMapConfig();

    const [selectedBaseLayer, setSelectedBaseLayer] = useState(null);

    const [selectedPoint, setSelectedPoint] = useState(null);

    const [boundingBox, setBoundingBox] = useState(null);
    const [buffer, setBuffer] = useState(null);
    const [showToc, setShowToc] = useState(true);

    const [baseLayers, setBaseLayers] = useState(customBaseLayers || defaultBaseLayers);

    const [mapCRS, setMapCRS] = useState(customCRS || defaultCRS);
    const [mapCRSType, setMapCRSType] = useState(customCRSType || defaultCRSType);

    const [mapOptions, setMapOptions] = useState({
        ...defaultMapOptions,
        ...customMapOptions,
    });

    const [controlOptions, setControlOptions] = useState({
        ...defaultControlOptions,
        ...customControlOptions,
    });

    const [tocOptions, setTocOptions] = useState({
        ...defaultTocOptions,
        ...customTocOptions,
    });

    const mapDOMRef = useRef(null); // MapView
    const mapObjectRef = useRef(null); // LeafletMap

    const {filter: mapFilter, setFilterValue} = useScopedFilters({
        defaultFilter: defaultMapFilter,
        scope: "map",
        externalFilter: {buffer},
    });

    useEffect(() => {
        setSelectedBaseLayer(baseLayers[0]);
    }, []);

    useEffect(() => {
        addBufferToFilter();
    }, [buffer]);

    const addBufferToFilter = () => {
        setFilterValue("buffer", buffer);
    };

    useEffect(() => {
        console.log({selectedPoint});
        setFilterValue("selected_point", selectedPoint);
    }, [selectedPoint]);

    const updateMapFilter = filter => {
        if (!filter || !Object.keys(filter).length) {
            addBufferToFilter();
        } else {
            addBufferToFilter();
            Object.entries(filter).forEach(([key, value]) => {
                setFilterValue(key, value);
            });
        }
    };

    return (
        <MapContext.Provider
            value={{
                mapDOMRef,
                mapObjectRef,
                selectedBaseLayer,
                setSelectedBaseLayer,
                baseLayers,
                mapCRS,
                setMapCRS,
                mapCRSType,
                setMapCRSType,
                setBaseLayers,
                mapFilter,
                updateMapFilter,
                buffer,
                setBuffer,
                mapOptions,
                setMapOptions,
                controlOptions,
                setControlOptions,
                tocOptions,
                setTocOptions,
                showToc,
                setShowToc,
                boundingBox,
                setBoundingBox,
                selectedPoint,
                setSelectedPoint,
            }}
        >
            {children}
        </MapContext.Provider>
    );
}

const useMapContext = () => {
    return useContext(MapContext);
};

export {useMapContext};
