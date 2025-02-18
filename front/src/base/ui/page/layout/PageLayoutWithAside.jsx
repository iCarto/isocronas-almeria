import {cloneElement} from "react";
import {Outlet} from "react-router-dom";
import {usePageContext} from "base/ui/page/provider";

import {
    FOOTER_HEIGHT,
    PAGE_MENU_DRAWER_WIDTH,
    SIDEBAR_PANEL_DRAWER_WIDTH,
    SUBPAGE_MENU_DRAWER_WIDTH,
    SELECTOR_RIGHT_PANEL_WIDTH,
} from "base/ui/baseApp/config/measurements";

import {SidebarPanelDrawer} from "base/ui/sidebar";
import {ContentContainer} from "base/ui/main";

import Box from "@mui/material/Box";

const PageLayoutWithAside = ({
    children = null,
    leftNav = null,
    subPage = false,
    style = {},
}) => {
    const {isSidebarPanelOpen} = usePageContext();

    const drawerWidth = subPage ? SUBPAGE_MENU_DRAWER_WIDTH : PAGE_MENU_DRAWER_WIDTH;

    return (
        <ContentContainer
            open={isSidebarPanelOpen}
            openMarginRight={SIDEBAR_PANEL_DRAWER_WIDTH - SELECTOR_RIGHT_PANEL_WIDTH}
            style={{padding: 0, ...style}}
        >
            {leftNav && cloneElement(leftNav)}
            <>
                <Box
                    role="page-container"
                    sx={{
                        marginLeft: leftNav ? `calc(${drawerWidth}px)` : "",
                    }}
                    // style={{minHeight: `calc(100vh - ${FOOTER_HEIGHT}px`}}
                >
                    {children || <Outlet />}
                </Box>
                {children && (
                    <SidebarPanelDrawer isSidebarPanelOpen={isSidebarPanelOpen}>
                        <Outlet />
                    </SidebarPanelDrawer>
                )}
            </>
        </ContentContainer>
    );
};

export default PageLayoutWithAside;
