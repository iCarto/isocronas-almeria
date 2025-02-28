import {createContext, useContext, useEffect, useRef, useState} from "react";
import {useMapConfig} from "./MapConfig";
import {FilterUtil} from "base/filter/utilities";

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
    const [selectedTravelTime, setSelectedTravelTime] = useState(); // Isocronas
    const [selectedTransport, setSelectedTransport] = useState(); // Isocronas
    const [boundingBox, setBoundingBox] = useState(null);
    const [mapFilter, setMapFilter] = useState({...defaultMapFilter});
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

    useEffect(() => {
        setSelectedBaseLayer(baseLayers[0]);
    }, []);

    // And this component have to check changes in moduleFilter to update mapFilter
    useEffect(() => {
        replaceFilter({...mapFilter, buffer: buffer});
    }, [buffer]);

    const replaceFilter = newFilter => {
        console.log("map filter change", {propertiesChanged: newFilter});
        const cleanedFilter = FilterUtil.cleanFilter({
            ...newFilter,
        });
        if (!FilterUtil.equalsFilter(mapFilter, cleanedFilter)) {
            setMapFilter({...cleanedFilter});
            console.log("filter page changed", {cleanedFilter});
        }
    };

    const updateMapFilter = filter => {
        console.log("map filter update", {filter});
        if (!filter || !Object.keys(filter).length) {
            replaceFilter({buffer: buffer});
        } else {
            replaceFilter({buffer: buffer, ...filter});
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
                selectedTravelTime,
                setSelectedTravelTime,
                selectedTransport,
                setSelectedTransport,
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
