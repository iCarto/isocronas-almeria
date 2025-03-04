import {MapProvider} from "base/map";
import {MapBaseLayersProvider} from "base/map/layer";
import {createIsochroneLayerConfig, createPoiLayerConfig, PoisMapParams} from "poi/map";
import {useIsocronasMapConfig} from "app/map";

const PoisMapProvider = ({children = null}) => {
    // map config
    const {crs, crsType, tocOptions, mapOptions, baseLayers} = useIsocronasMapConfig();

    const poiLayerConfig = createPoiLayerConfig({
        fitBounds: false,
    });

    // end map config

    return (
        <MapProvider
            crs={crs}
            crsType={crsType}
            baseLayers={baseLayers}
            tocOptions={tocOptions}
            mapOptions={mapOptions}
        >
            <PoisMapParams>
                <MapBaseLayersProvider
                    layers={[poiLayerConfig, createIsochroneLayerConfig()]}
                >
                    {children}
                </MapBaseLayersProvider>
            </PoisMapParams>
        </MapProvider>
    );
};
export default PoisMapProvider;
