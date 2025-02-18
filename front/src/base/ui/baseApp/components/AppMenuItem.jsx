import {useLocation, useResolvedPath} from "react-router-dom";
import {Link} from "react-router-dom";

import {CUSTOM_FONT_FAMILY} from "Theme";

import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";

const AppMenuItem = ({
    to,
    text = "",
    textStyle = {},
    resolvedPathName = null,
    resolvedSecondPathName = null,
}) => {
    const theme = useTheme();
    let resolved = useResolvedPath(resolvedPathName || to);
    let resolvedAlternative = useResolvedPath(resolvedSecondPathName);
    let location = useLocation();

    let selected =
        location.pathname.startsWith(resolved.pathname) ||
        location.pathname.startsWith(resolvedAlternative.pathname);

    const defaultItemStyle = {
        color: "white",
        fontFamily: CUSTOM_FONT_FAMILY,
        ...textStyle,
    };

    const selectedItemtStyle = {
        ...defaultItemStyle,
        "&.Mui-selected": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
            },
        },
    };

    return (
        <MenuItem
            role="tab"
            tabIndex={0}
            aria-selected="true"
            to={to}
            component={Link}
            selected={selected}
            sx={selected ? selectedItemtStyle : defaultItemStyle}
        >
            {text}
        </MenuItem>
    );
};

export default AppMenuItem;
