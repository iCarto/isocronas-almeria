import {useEffect} from "react";
import {t} from "@lingui/macro";

import {useMapContext} from "base/map";
import {
    MapGeojsonLayerFeatureListProvider,
    MapGeojsonLayerFeatureList,
} from "base/map/layer/geojson";
import {IsocronasMapActionsToolbar} from ".";
import {MapTOC} from "base/map/toc";

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
        overflow: "auto",
        height: "97%",

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
        borderRadius: 5,
        ...style,
    };
});

const ToggleRightBarButton = ({showToc, onClick}) => {
    return (
        <Box
            sx={{
                position: "relative",
                top: 6,
                right: 6,
                zIndex: 1,
                // width: 0,
                height: "100%",
            }}
        >
            <Tooltip title={t`${showToc ? "Show" : "Hide"} legend`}>
                <IconButton
                    onClick={onClick}
                    color="primary"
                    sx={{p: 0.5, background: "rgba(230, 217, 199, 0.8)"}}
                >
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

const IsocronasMapControlPanel = ({show = true}) => {
    const {showToc, setShowToc, mapObjectRef} = useMapContext();

    useEffect(() => {
        // Timeout necessary to wait for the end of the transition
        // so map could calculate the new size
        setTimeout(() => {
            mapObjectRef.current.invalidateSize();
        }, TRANSITION_TIME);
    }, [showToc]);

    return (
        <Stack
            direction="row"
            sx={{
                zIndex: 1,
                position: "absolute",
                top: 0,
                right: 0,
                height: "100%",
                py: 1,
                pr: 1,
            }}
        >
            {show && (
                <ToggleRightBarButton
                    showToc={showToc}
                    onClick={() => {
                        setShowToc(!showToc);
                    }}
                />
            )}
            <RightBarContainer open={show && showToc}>
                <Stack direction="row" sx={{height: "100%"}}>
                    <MapGeojsonLayerFeatureListProvider>
                        {/* <MapGeojsonLayerFeatureList /> */}
                        <Stack>
                            <IsocronasMapActionsToolbar />
                            <MapTOC />
                        </Stack>
                    </MapGeojsonLayerFeatureListProvider>
                </Stack>
            </RightBarContainer>
        </Stack>
    );
};

export default IsocronasMapControlPanel;
