import {Outlet} from "react-router-dom";
import {Header} from "base/ui/header";

import Box from "@mui/material/Box";

const AppLayout = ({hero = null, menu = null, footer = null}) => {
    return (
        <Box
            role="wrapper"
            sx={{display: "flex", flexDirection: "column", minHeight: "100vh"}}
        >
            {hero && <Header hero={hero} menu={menu} />}
            <Outlet />
            {footer}
        </Box>
    );
};

export default AppLayout;
