import {PageMenuProvider} from "base/ui/menu/provider";
import Box from "@mui/material/Box";
import MenuList from "@mui/material/MenuList";

const PageMenu = ({children}) => {
    return (
        <PageMenuProvider>
            <Box component="nav">
                <MenuList sx={{color: "white"}} dense disablePadding>
                    {children}
                </MenuList>
            </Box>
        </PageMenuProvider>
    );
};

export default PageMenu;
