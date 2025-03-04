import {useEffect} from "react";
import {t} from "@lingui/macro";

import {theme} from "Theme";
import {useMapContext} from "base/map";
import {MapGeojsonLayerFeatureListProvider} from "base/map/layer/geojson";
import {IsocronasMapActionsToolbar, IsocronasMapCategoriesSelector} from ".";
import {MapTOC} from "base/map/toc";

import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const TRANSITION_TIME = 200;

const SideBarContainer = styled("div", {
    shouldForwardProp: prop => prop !== "open",
})(({theme, style, open}) => {
    return {
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        height: "100%",
        boxShadow: theme.shadows[2],

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
        backgroundColor: theme.palette.pageBackground.secondary,
        ...style,
    };
});

const ToggleSideBarButton = ({showToc, onClick}) => {
    return (
        <Box
            sx={{
                position: "relative",
                top: 6,
                right: 6,
                zIndex: 1,
                // width: 0,
                height: "100%",
                ml: 1,
            }}
        >
            <Tooltip title={t`${showToc ? "Show" : "Hide"} legend`}>
                <IconButton
                    onClick={onClick}
                    color="primary"
                    sx={{
                        p: 0.5,
                        background: "rgba(230, 217, 199, 0.8)",
                        boxShadow: theme.shadows[2],
                    }}
                >
                    {showToc ? (
                        <KeyboardDoubleArrowLeftIcon />
                    ) : (
                        <KeyboardDoubleArrowRightIcon />
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
                position: "absolute",
                top: 0,
                left: 0,
                maxWidth: 400,
                height: "100%",
                zIndex: 1,
                py: 1,
                pl: 1,
            }}
        >
            <SideBarContainer open={show && showToc}>
                <MapGeojsonLayerFeatureListProvider>
                    <IsocronasMapActionsToolbar />
                    <IsocronasMapCategoriesSelector />
                    {/* <MapTOC /> */}
                </MapGeojsonLayerFeatureListProvider>
            </SideBarContainer>
            {show && (
                <ToggleSideBarButton
                    showToc={showToc}
                    onClick={() => {
                        setShowToc(!showToc);
                    }}
                />
            )}
        </Stack>
    );
};

export default IsocronasMapControlPanel;
