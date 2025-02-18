import {
    useMapGeojsonLayerContext,
    useMapGeojsonLayerDataContext,
    useMapGeojsonLayerFeatureListContext,
} from ".";
import {MapLegendTOCDiscriminatorActions} from "../../legend";

import Divider from "@mui/material/Divider";

import {ActionsMenu, MenuAction} from "base/ui/menu";
import {useMapLayerDiscriminatorContext} from "./MapGeojsonLayerDiscriminatorProvider";

import DownloadIcon from "@mui/icons-material/Download";
import EditLocationOutlinedIcon from "@mui/icons-material/EditLocationOutlined";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

const MapGeojsonLayerTOCListItemActions = () => {
    const {layerConfig, downloadData} = useMapGeojsonLayerContext();
    const {discriminators} = useMapLayerDiscriminatorContext();

    const {elements} = useMapGeojsonLayerDataContext();
    const {handleOpen} = useMapGeojsonLayerFeatureListContext();

    /*
    // NOT IMPLEMENTED YET
    let downloadAction = (
        <MenuAction
            id="download-layer"
            key="download-layer"
            icon={<DownloadIcon />}
            text="Descargar"
            handleClick={downloadData}
        />
    ); */
    const openTableLayer = () => {
        handleOpen(layerConfig, elements);
    };

    return (
        <Stack direction="row" alignItems="center">
            {layerConfig.list && (
                <IconButton sx={{p: 0, width: 24, height: 24}} onClick={openTableLayer}>
                    <EditLocationOutlinedIcon sx={{fontSize: 24}} />
                </IconButton>
            )}
            {discriminators && discriminators.length > 1 && (
                <ActionsMenu size="small">
                    <MapLegendTOCDiscriminatorActions />
                </ActionsMenu>
            )}
        </Stack>
    );
};

export default MapGeojsonLayerTOCListItemActions;
