import {msg} from "@lingui/macro";
import {i18n} from "@lingui/core";
import {MapProvider} from "base/map";
import {MapBaseLayersProvider} from "base/map/layer";
import {createPoiLayerConfig} from "poi/map";
import {useListPageGroupContext} from "base/ui/page/provider";
import {useIsocronasMapConfig} from "app/map";
// import {createWaterLevelLayer} from "base/location/map";

const PoisMapProvider = ({children = null, poi = null}) => {
    // map config
    const {crs, crsType, tocOptions, mapOptions, baseLayers} = useIsocronasMapConfig();

    const poiLayerConfig = createPoiLayerConfig({fitBounds: true});

    const {pageGroupFilter} = useListPageGroupContext();

    // const waterLevel2LayerConfig = createWaterLevelLayer({
    //     level: 2,
    //     label: i18n._(msg`Water level 2`),
    //     color: "#115ca5",
    // });
    // const waterLevel3LayerConfig = createWaterLevelLayer({
    //     level: 3,
    //     label: i18n._(msg`Water level 3`),
    //     color: "#5ba3d0",
    // });

    // const waterLevel4LayerConfig = createWaterLevelLayer({
    //     level: 4,
    //     label: i18n._(msg`Water level 4`),
    //     color: "#bed8ec",
    //     visible: false,
    // });

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
            <MapBaseLayersProvider
                layers={[poiLayerConfig]}
                // auxLayers={[
                //     waterLevel2LayerConfig,
                //     waterLevel3LayerConfig,
                //     waterLevel4LayerConfig,
                // ]}
            >
                {children}
            </MapBaseLayersProvider>
        </MapProvider>
    );
};
export default PoisMapProvider;
