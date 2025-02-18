import useTheme from "@mui/material/styles/useTheme";
import styled from "@mui/material/styles/styled";

import {Children, cloneElement, useState} from "react";

import {PAGE_MENU_DRAWER_WIDTH} from "base/ui/baseApp/config/measurements";
import {ModuleMenuListItemButton} from ".";

import MuiDrawer from "@mui/material/Drawer";
import MenuList from "@mui/material/MenuList";
import Divider from "@mui/material/Divider";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const closedMixin = theme => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
    bgcolor: theme.palette.grey[50],
});

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== "open" && prop !== "collapsed",
})(({theme, collapsed, open}) => ({
    width: collapsed ? "70px" : `${PAGE_MENU_DRAWER_WIDTH}px`,
    flexShrink: 0,
    whiteSpace: "normal",
    boxSizing: "border-box",
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const ModuleMenu = ({basePath, menuOptions, collapsed = false}) => {
    const theme = useTheme();

    const getMenuOption = menuOption => {
        return (
            <ModuleMenuListItemButton
                key={`module-menu-${menuOption.text.toLowerCase()}`}
                to={`/${basePath}/${menuOption.to}`}
                text={menuOption.text}
                icon={menuOption.icon ? menuOption.icon : <ArrowRightIcon />}
                collapsed={collapsed}
            />
        );
    };

    return (
        <Drawer
            component="nav"
            variant="permanent"
            open={true}
            collapsed={true}
            role="left-side-page-menu"
            PaperProps={{
                sx: {
                    width: collapsed ? "70px" : `${PAGE_MENU_DRAWER_WIDTH}px`,
                    borderRight: "3px solid " + theme.palette.menu.primary.header.text,
                    // paddingBottom: `${FOOTER_HEIGHT}px`,
                },
            }}
        >
            <DrawerHeader />
            <Divider />
            <MenuList sx={{pt: 0, color: "white"}}>
                {menuOptions.map(menuOption => getMenuOption(menuOption))}
            </MenuList>
        </Drawer>
    );
};

export {ModuleMenu as default, DrawerHeader};
