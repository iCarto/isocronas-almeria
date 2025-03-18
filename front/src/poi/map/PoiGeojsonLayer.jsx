import {
    MapGeojsonLayerDataProvider,
    MapGeojsonLayerProvider,
} from "base/map/layer/geojson";
import PoisCategoryProvider from "./PoisCategoryProvider";

const PoiGeojsonLayer = ({layerConfig}) => {
    return (
        <MapGeojsonLayerProvider layerConfig={layerConfig}>
            <MapGeojsonLayerDataProvider>
                <PoisCategoryProvider />
            </MapGeojsonLayerDataProvider>
        </MapGeojsonLayerProvider>
    );
};

export default PoiGeojsonLayer;
