import {useMapBaseLayersContext} from "../layer";
import {MapGeojsonLayer} from "../layer/geojson";
import {MapTileLayer} from "../layer/tile";

import {ImageOverlayLayer, TileLayer, WMSLayer} from "../leaflet/layer";

import {MapTOCList} from ".";
import Divider from "@mui/material/Divider";
import {MapWMSLayer} from "../layer/wms";

const MapTOC = ({visible}) => {
    const {layers: layersConfig, auxLayers: auxLayersConfig} =
        useMapBaseLayersContext();

    console.log("CARTO >> Creating TOC", {layersConfig});

    const getLayerListItem = (layerConfig, index) => {
        console.log("CARTO >> Creating TOC entry", {index}, {layerConfig});
        if (
            layerConfig.layer instanceof TileLayer ||
            layerConfig.layer instanceof ImageOverlayLayer
        ) {
            return <MapTileLayer key={index} layerConfig={layerConfig} />;
        } else if (layerConfig.layer instanceof WMSLayer) {
            return <MapWMSLayer key={index} layerConfig={layerConfig} />;
        }
        return <MapGeojsonLayer key={index} layerConfig={layerConfig} />;
    };

    return (
        <MapTOCList visible={visible}>
            {layersConfig.map((layerConfig, index) => {
                return getLayerListItem(layerConfig, index);
            })}
            <Divider sx={{mt: 1}} />
            {auxLayersConfig.map((auxLayerConfig, index) => {
                return getLayerListItem(auxLayerConfig, index);
            })}
        </MapTOCList>
    );
};

export default MapTOC;
