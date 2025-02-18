import {MapTileLayerProvider, MapTileLayerTOCListItem} from ".";

const MapTileLayer = ({layerConfig}) => {
    return (
        <MapTileLayerProvider layerConfig={layerConfig}>
            <MapTileLayerTOCListItem />
        </MapTileLayerProvider>
    );
};

export default MapTileLayer;
