import {cloneElement} from "react";

import MapView from "../MapView";
import MapBaseRightBar from "./MapBaseRightBar";

import Stack from "@mui/material/Stack";

const MapBaseLayout = ({
    width = "100%",
    height = "100%",
    rightBarOptions: {show: showRightBar = true, component: rightBar = null} = {},
    mapStyle = {},
}) => {
    return (
        <Stack
            // direction="row"
            sx={{
                width,
                height,
                position: "relative",
            }}
        >
            <MapView style={mapStyle} />
            {rightBar ? (
                cloneElement(rightBar)
            ) : (
                <MapBaseRightBar show={showRightBar} />
            )}
        </Stack>
    );
};

export default MapBaseLayout;
