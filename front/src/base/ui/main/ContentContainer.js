import styled from "@mui/material/styles/styled";

import {SIDEBAR_PANEL_DRAWER_WIDTH} from "../baseApp/config/measurements";

const ContentContainer = styled("main", {
    shouldForwardProp: prop =>
        prop !== "open" && prop !== "openMarginRight" && prop !== "isSubPage",
})(({theme, style, openMarginRight = SIDEBAR_PANEL_DRAWER_WIDTH, open, isSubPage}) => {
    return {
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: 0,
        padding: isSubPage ? 0 : theme.spacing(1),
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: isSubPage ? 0 : openMarginRight,
        }),
        ...style,
    };
});

export default ContentContainer;
