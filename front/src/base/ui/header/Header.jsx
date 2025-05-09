import useTheme from "@mui/material/styles/useTheme";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

const Header = ({hero = null, menu = null, toolbarSx = {}}) => {
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar
                disableGutters
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    ...toolbarSx,
                }}
            >
                {hero}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
