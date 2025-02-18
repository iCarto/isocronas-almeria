import {Outlet} from "react-router-dom";
import {ScrollTopButton} from "base/navigation/components";
import Box from "@mui/material/Box";
import {cloneElement} from "react";
import {DrawerHeader} from "../menu/ModuleMenu";

const ModuleLayout = ({
    menu: {component: componentMenu = null, show: showMenu = true} = {},
}) => {
    return (
        <Box sx={{display: "flex"}} role="main">
            {showMenu && componentMenu ? cloneElement(componentMenu) : null}
            <Box sx={{flexGrow: 1}} role="module">
                <DrawerHeader role="drawer-header" />
                <Outlet />
                <ScrollTopButton />
            </Box>
        </Box>
    );
};

export default ModuleLayout;
