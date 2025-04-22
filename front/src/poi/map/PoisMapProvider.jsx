import {MapProvider} from "base/map";
import {MapBaseLayersProvider} from "base/map/layer";
import {
    useIsochroneLayerConfig,
    usePoiLayerConfig,
    PoiGeojsonLayer,
    PoisMapParamsProvider,
} from "poi/map";
import {useIsocronasMapConfig, createMunicipalitiesLayerConfig} from "app/map";

const PoisMapProvider = ({children = null}) => {
    // map config
    const {crs, crsType, tocOptions, mapOptions, controlOptions, baseLayers} =
        useIsocronasMapConfig();

    const poiLayerConfig = usePoiLayerConfig({
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
            controlOptions={controlOptions}
        >
            <PoisMapParamsProvider>
                <MapBaseLayersProvider
                    layers={[poiLayerConfig, useIsochroneLayerConfig()]}
                    auxLayers={[createMunicipalitiesLayerConfig()]}
                >
                    {children}
                </MapBaseLayersProvider>
            </PoisMapParamsProvider>
        </MapProvider>
    );
};
export default PoisMapProvider;
