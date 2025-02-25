import {useEffect} from "react";

import {useMapContext} from "../MapProvider";
import {MapActionsToolbar} from "../actions";
import {MapTOC} from "../toc";
import {
    MapGeojsonLayerFeatureList,
    MapGeojsonLayerFeatureListProvider,
} from "../layer/geojson";

import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const TRANSITION_TIME = 200;

const RightBarContainer = styled("div", {
    shouldForwardProp: prop => prop !== "open",
})(({theme, style, open}) => {
    return {
        flexGrow: 1,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: TRANSITION_TIME,
        }),
        width: 0,
        ...(open && {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.easeOut,
                duration: TRANSITION_TIME,
            }),
            width: "100%",
        }),
        ...style,
    };
});

const ToggleRightBarButton = ({showToc, onClick}) => {
    return (
        <Box
            sx={{
                zIndex: 4000,
                width: 0,
                height: "100%",
            }}
        >
            <Tooltip title={`${showToc ? "Ocultar" : "Mostrar"} legenda`}>
                <IconButton onClick={onClick} color="primary" sx={{left: -35}}>
                    {showToc ? (
                        <KeyboardDoubleArrowRightIcon />
                    ) : (
                        <KeyboardDoubleArrowLeftIcon />
                    )}
                </IconButton>
            </Tooltip>
        </Box>
    );
};

const MapBaseRightBar = ({show}) => {
    const {showToc, setShowToc, mapObjectRef} = useMapContext();

    useEffect(() => {
        // Timeout necessary to wait for the end of the transition
        // so map could calculate the new size
        setTimeout(() => {
            mapObjectRef.current.invalidateSize();
        }, TRANSITION_TIME);
    }, [showToc]);

    return (
        <Stack direction="row" sx={{height: "100%"}}>
            {show && (
                <ToggleRightBarButton
                    showToc={showToc}
                    onClick={() => {
                        setShowToc(!showToc);
                    }}
                />
            )}
            <RightBarContainer
                open={show && showToc}
                sx={{
                    overflowY: "auto",
                    height: "100%",
                }}
            >
                <Stack direction="row" sx={{height: "100%"}}>
                    <MapGeojsonLayerFeatureListProvider>
                        <MapGeojsonLayerFeatureList />
                        <Stack>
                            <MapActionsToolbar />
                            <MapTOC />
                        </Stack>
                    </MapGeojsonLayerFeatureListProvider>
                </Stack>
            </RightBarContainer>
        </Stack>
    );
};

export default MapBaseRightBar;
