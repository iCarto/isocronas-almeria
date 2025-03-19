import {MapGeojsonLayerProvider} from "base/map/layer/geojson";
import PoisCategoryProvider from "./PoisCategoryProvider";
import {PoiGeojsonLayerDataProvider} from ".";

const PoiGeojsonLayer = ({layerConfig}) => {
    return (
        <MapGeojsonLayerProvider layerConfig={layerConfig}>
            <PoiGeojsonLayerDataProvider>
                <PoisCategoryProvider />
            </PoiGeojsonLayerDataProvider>
        </MapGeojsonLayerProvider>
    );
};

export default PoiGeojsonLayer;
