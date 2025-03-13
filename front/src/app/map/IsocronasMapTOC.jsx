import {GeojsonClusterLayer, GeojsonLayer} from "base/map/leaflet/layer";
import {
    MapGeojsonLayerProvider,
    MapGeojsonLayerDiscriminatorProvider,
    MapGeojsonLayerDataProvider,
    MapGeojsonLayerFeatureListProvider,
} from "base/map/layer/geojson";
import {PoisMapFeatureList} from "poi/map";
import {useMapBaseLayersContext} from "base/map/layer";
import {MapTOCList} from "base/map/toc";

const IsocronasMapTOC = () => {
    const {layers: layersConfig, auxLayers: auxLayersConfig} =
        useMapBaseLayersContext();

    console.log("CARTO >> Creating TOC", {layersConfig});

    return (
        <MapTOCList>
            {layersConfig.map((layerConfig, index) => {
                return (
                    <MapGeojsonLayerProvider key={index} layerConfig={layerConfig}>
                        <MapGeojsonLayerDiscriminatorProvider>
                            <MapGeojsonLayerDataProvider>
                                {layerConfig.legend.label === "POI" ? ( // TO-DO: Fix this.
                                    <MapGeojsonLayerFeatureListProvider>
                                        <PoisMapFeatureList />
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
