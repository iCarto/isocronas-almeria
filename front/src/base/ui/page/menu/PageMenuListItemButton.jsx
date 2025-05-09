import {Link, useLocation, useResolvedPath} from "react-router-dom";

import {theme} from "Theme";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

const PageMenuListItemButton = ({
    to,
    text,
    icon = null,
    resolvedPathName = null,
    ...props
}) => {
    let resolved = useResolvedPath(to);
    let location = useLocation();

    const selected = location.pathname.startsWith(
        resolvedPathName || resolved.pathname
    );

    return (
        <>
            <ListItemButton
                component={Link}
                to={to}
                {...props}
                selected={selected}
                sx={{
                    bgcolor: theme.palette.menu.secondary.options.background,
                    borderLeft: selected
                        ? `3px solid ${theme.palette.menu.primary.header.text}`
                        : null,
                }}
            >
                {icon && (
                    <Tooltip title={text} placement="bottom-end">
                        <ListItemIcon
                            style={{
                                minWidth: "35px",
                                color: selected
                                    ? theme.palette.menu.primary.header.text
                                    : theme.palette.menu.secondary.options.text,
                            }}
                        >
                            {icon}
                        </ListItemIcon>
                    </Tooltip>
                )}
                <ListItemText
                    sx={{
                        color: selected
                            ? theme.palette.menu.primary.header.text
                            : theme.palette.menu.secondary.options.text,
                    }}
                    primaryTypographyProps={{fontWeight: selected ? "bold" : "inherit"}}
                    primary={text}
                />
            </ListItemButton>
            <Divider sx={{borderColor: "#f3f3f3"}} />
        </>
    );
};

export default PageMenuListItemButton;
