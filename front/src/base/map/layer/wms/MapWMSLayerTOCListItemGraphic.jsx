import {useMapWMSLayerProviderContext} from "./MapWMSLayerProvider";
import Box from "@mui/material/Box";

const MapWMSLayerTOCListItemGraphic = ({legend, level = 1}) => {
    const {
        layerConfig: {load},
    } = useMapWMSLayerProviderContext();

    const getGraphicsUrl = () => {
        // &width=154&height=155
        return `${load}&service=WMS&request=GetLegendGraphic&layertitle=false&transparent=true&layer=${legend.layerCodes.join(
            ","
        )}`;
    };

    return (
        <Box className="LayerMenuDiscriminatorInfo">
            <img src={getGraphicsUrl()} />
        </Box>
    );
};

export default MapWMSLayerTOCListItemGraphic;
