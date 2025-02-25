import {MapProvider} from "base/map";
import {MapBaseLayersProvider} from "base/map/layer";
import {createPoiLayerConfig} from "poi/map";
import {useListPageGroupContext} from "base/ui/page/provider";
import {useIsocronasMapConfig} from "app/map";

const PoisMapProvider = ({children = null}) => {
    // map config
    const {crs, crsType, tocOptions, mapOptions, baseLayers} = useIsocronasMapConfig();
    const {pageGroupFilter} = useListPageGroupContext();

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
            defaultMapFilter={{...pageGroupFilter}}
        >
            <MapBaseLayersProvider layers={[poiLayerConfig]}>
                {children}
            </MapBaseLayersProvider>
        </MapProvider>
    );
};
export default PoisMapProvider;
