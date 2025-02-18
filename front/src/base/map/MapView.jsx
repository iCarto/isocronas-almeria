import {useEffect} from "react";
import {useLeafletMap} from "./leaflet";
import {useMapContext} from "./MapProvider";
import {HEADER_HEIGHT} from "base/ui/baseApp/config/measurements";

const mapDefaultStyle = {
    width: "100%",
    height: "100%",
    minHeight: `calc(100vh - ${HEADER_HEIGHT * 2}px)`,
};

const MapView = ({style: mapCustomStyle = {}}) => {
    const {createMap, isMapLoaded, removeMap, setBaseLayer} = useLeafletMap();

    const {mapDOMRef, selectedBaseLayer} = useMapContext();

    useEffect(() => {
        createMap();

        return () => {
            if (isMapLoaded()) {
                removeMap();
            }
        };
    }, []);

    useEffect(() => {
        setBaseLayer(selectedBaseLayer);
    }, [selectedBaseLayer]);

    return (
        <div id="map" style={{...mapDefaultStyle, ...mapCustomStyle}} ref={mapDOMRef} />
    );
};
export default MapView;
