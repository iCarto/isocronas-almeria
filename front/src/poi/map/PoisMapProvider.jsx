import {MapProvider} from "base/map";
import {MapBaseLayersProvider} from "base/map/layer";
import {
    createIsochroneLayerConfig,
    createPoiLayerConfig,
    PoiGeojsonLayer,
    PoisMapParamsProvider,
} from "poi/map";
import {useIsocronasMapConfig} from "app/map";

const PoisMapProvider = ({children = null}) => {
    // map config
    const {crs, crsType, tocOptions, mapOptions, baseLayers} = useIsocronasMapConfig();

    const poiLayerConfig = createPoiLayerConfig({
        tocComponent: PoiGeojsonLayer,
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
            <PoisMapParamsProvider>
                <MapBaseLayersProvider
                    layers={[poiLayerConfig, createIsochroneLayerConfig()]}
                >
                    {children}
                </MapBaseLayersProvider>
            </PoisMapParamsProvider>
        </MapProvider>
    );
};
export default PoisMapProvider;
