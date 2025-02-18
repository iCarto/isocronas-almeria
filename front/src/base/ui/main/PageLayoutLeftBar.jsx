import {cloneElement} from "react";

import useTheme from "@mui/material/styles/useTheme";

import {
    HEADER_HEIGHT,
    SUBPAGE_MENU_DRAWER_WIDTH,
} from "base/ui/baseApp/config/measurements";
import Stack from "@mui/material/Stack";

const PageLayoutLeftBar = ({
    element,
    selector: {component: componentSelector = null, show: showSelector = true} = {},
    summary: {component: componentSummary = null, show: showSummary = true} = {},
    menu: {component: componentMenu = null, show: showMenu = true} = {},
}) => {
    const theme = useTheme();

    const menuStyles = {
        position: "fixed",
        zIndex: 1,
        width: `${SUBPAGE_MENU_DRAWER_WIDTH}px`,
        bgcolor: theme.palette.menu.secondary.background,
        overflowY: "auto",
        height: `calc(100vh - ${HEADER_HEIGHT}px`,
    };

    return (
        <Stack sx={{...menuStyles}} component="nav">
            {showSelector && componentSelector
                ? cloneElement(componentSelector, {
                      id: element?.id,
                  })
                : null}
            {showSummary && componentSummary
                ? cloneElement(componentSummary, {
                      id: element?.id,
                      element: element,
                  })
                : null}
            {showMenu && componentMenu
                ? cloneElement(componentMenu, {id: element?.id, element: element})
                : null}
        </Stack>
    );
};

export default PageLayoutLeftBar;
