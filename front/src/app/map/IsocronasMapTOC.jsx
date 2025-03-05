import {GeojsonClusterLayer} from "base/map/leaflet/layer";
import {
    MapGeojsonLayerProvider,
    MapGeojsonLayerDiscriminatorProvider,
    MapGeojsonLayerDataProvider,
    MapGeojsonLayerFeatureListProvider,
} from "base/map/layer/geojson";
import {PoisMapGeojsonLayerFeatureList} from "poi/map";
import {useMapBaseLayersContext} from "base/map/layer";
import {MapTOCList} from "base/map/toc";

const IsocronasMapTOC = () => {
    const {layers: layersConfig, auxLayers: auxLayersConfig} =
        useMapBaseLayersContext();

    console.log("CARTO >> Creating TOC", {layersConfig});

    return (
        <MapTOCList>
            {layersConfig.map((layerConfig, index) => {
                console.log("CARTO >> Creating TOC entry", {index}, {layerConfig});
                return (
                    <MapGeojsonLayerProvider key={index} layerConfig={layerConfig}>
                        <MapGeojsonLayerDiscriminatorProvider>
                            <MapGeojsonLayerDataProvider>
                                {layerConfig?.layer instanceof GeojsonClusterLayer ? ( // TO-DO: Fix this.
                                    <MapGeojsonLayerFeatureListProvider>
                                        <PoisMapGeojsonLayerFeatureList />
                                    </MapGeojsonLayerFeatureListProvider>
                                ) : null}
                            </MapGeojsonLayerDataProvider>
                        </MapGeojsonLayerDiscriminatorProvider>
                    </MapGeojsonLayerProvider>
                );
            })}
        </MapTOCList>
    );
};

export default IsocronasMapTOC;
