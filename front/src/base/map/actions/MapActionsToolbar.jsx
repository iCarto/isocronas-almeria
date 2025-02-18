import {Trans} from "@lingui/macro";
import {MapBaseLayerAction, MapBufferAction, MapImageAction} from ".";
import {useMapContext} from "../MapProvider";

import useTheme from "@mui/material/styles/useTheme";

import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const MapActionsToolbar = ({}) => {
    const theme = useTheme();

    const {
        tocOptions: {
            baseLayer: {show: showBaseLayer = true},
            buffer: {show: showBuffer = true},
            image: {show: showImage = true},
        },
    } = useMapContext();

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                bgcolor: theme.palette.secondary.light,
                borderBottom: `1px solid ${theme.palette.secondary.main}`,
                borderLeft: `1px solid ${theme.palette.secondary.main}`,
                height: "50px",
            }}
        >
            <Typography sx={{pl: 3, pt: 1, pb: 1}} variant="h6">
                <Trans>Layers</Trans>
            </Typography>
            <ButtonGroup variant="outlined" aria-label="map button group">
                {showBaseLayer && (
                    <>
                        <Divider orientation="vertical" flexItem />
                        <MapBaseLayerAction />
                    </>
                )}
                {showBuffer && (
                    <>
                        <Divider orientation="vertical" flexItem />
                        <MapBufferAction />
                    </>
                )}
                {showImage && (
                    <>
                        <Divider orientation="vertical" flexItem />
                        <MapImageAction />
                    </>
                )}
            </ButtonGroup>
        </Grid>
    );
};

export default MapActionsToolbar;
