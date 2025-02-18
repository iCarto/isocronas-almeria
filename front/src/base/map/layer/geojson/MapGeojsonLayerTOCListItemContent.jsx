import {
    MapGeojsonLayerTOCListItemActions,
    useMapGeojsonLayerContext,
    useMapGeojsonLayerDataContext,
    useMapGeojsonLayerFeatureListContext,
} from ".";
import {MapLegendTOCDiscriminator} from "../../legend";
import {MapLayerTOCListItem} from "../../toc";

const MapGeojsonLayerTOCListItemContent = () => {
    const {
        layerConfig: {layer, legend},
        visible,
        setVisible,
    } = useMapGeojsonLayerContext();

    const {loading, error} = useMapGeojsonLayerDataContext();

    const {layerConfig: listLayerConfig} = useMapGeojsonLayerFeatureListContext();

    const selected = listLayerConfig?.legend.code === legend.code;

    return (
        <MapLayerTOCListItem
            legend={legend}
            layerStyle={layer.style}
            visible={visible}
            setVisible={setVisible}
            loading={loading}
            error={error}
            secondaryAction={<MapGeojsonLayerTOCListItemActions />}
            discriminatorLegend={<MapLegendTOCDiscriminator />}
            selected={selected}
        />
    );
};

export default MapGeojsonLayerTOCListItemContent;
