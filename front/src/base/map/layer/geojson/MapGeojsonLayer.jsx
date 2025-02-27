import PoiMapGeojsonLayerFeatureList from "poi/map/PoiMapGeojsonLayerFeatureList";
import {
    MapGeojsonLayerDiscriminatorProvider,
    MapGeojsonLayerProvider,
    MapGeojsonLayerDataProvider,
} from ".";

const MapGeojsonLayer = ({layerConfig}) => {
    return (
        <MapGeojsonLayerProvider layerConfig={layerConfig}>
            <MapGeojsonLayerDiscriminatorProvider>
                <MapGeojsonLayerDataProvider>
                    <PoiMapGeojsonLayerFeatureList />
                </MapGeojsonLayerDataProvider>
            </MapGeojsonLayerDiscriminatorProvider>
        </MapGeojsonLayerProvider>
    );
};

export default MapGeojsonLayer;
