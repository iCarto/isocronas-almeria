import {MapGeojsonLayerProvider} from "base/map/layer/geojson";
import PoisCategoryProvider from "./PoisCategoryProvider";
import {PoiGeojsonLayerDataProvider} from ".";

const PoiGeojsonLayer = ({layerConfig}) => {
    return (
        <MapGeojsonLayerProvider layerConfig={layerConfig}>
            <PoisCategoryProvider>
                <PoiGeojsonLayerDataProvider />
            </PoisCategoryProvider>
        </MapGeojsonLayerProvider>
    );
};

export default PoiGeojsonLayer;
