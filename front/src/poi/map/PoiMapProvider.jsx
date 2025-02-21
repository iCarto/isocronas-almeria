import {MapBaseLayersProvider} from "base/map/layer";
import {MapProvider} from "base/map";

const PoiMapProvider = ({children = null, element: poi = null, markAsDirty = null}) => {
    return (
        <MapProvider
        // crs={crs}
        // crsType={crsType}
        // baseLayers={baseLayers}
        // tocOptions={tocOptions}
        // mapOptions={mapOptions}
        >
            <MapBaseLayersProvider
                layers={
                    [
                        // poiLayerConfig,
                        // poiAbstractionsLayerConfig,
                        // poiCropsLayerConfig,
                        // poiFishTanksLayerConfig,
                    ]
                }
                auxLayers={[]}
            >
                {children}
            </MapBaseLayersProvider>
        </MapProvider>
    );
};
export default PoiMapProvider;
