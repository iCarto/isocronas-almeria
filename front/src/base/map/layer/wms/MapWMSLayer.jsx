import {MapWMSLayerProvider, MapWMSLayerTOCListItemGroup} from ".";

const MapWMSLayer = ({layerConfig}) => {
    return (
        <MapWMSLayerProvider layerConfig={layerConfig}>
            <MapWMSLayerTOCListItemGroup />
        </MapWMSLayerProvider>
    );
};

export default MapWMSLayer;
