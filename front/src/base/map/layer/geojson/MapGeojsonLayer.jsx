import {
    MapGeojsonLayerDiscriminatorProvider,
    MapGeojsonLayerProvider,
    MapGeojsonLayerDataProvider,
} from ".";
import MapGeojsonLayerTOCListItemContent from "./MapGeojsonLayerTOCListItemContent";

const MapGeojsonLayer = ({layerConfig}) => {
    return (
        <MapGeojsonLayerProvider layerConfig={layerConfig}>
            <MapGeojsonLayerDiscriminatorProvider>
                <MapGeojsonLayerDataProvider>
                    <MapGeojsonLayerTOCListItemContent />
                </MapGeojsonLayerDataProvider>
            </MapGeojsonLayerDiscriminatorProvider>
        </MapGeojsonLayerProvider>
    );
};

export default MapGeojsonLayer;
