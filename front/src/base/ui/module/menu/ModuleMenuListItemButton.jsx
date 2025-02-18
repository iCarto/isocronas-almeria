import {useLocation, useNavigate, useResolvedPath} from "react-router-dom";

import {theme} from "Theme";
import {useErrors} from "base/error/provider";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

const ModuleMenuListItemButton = ({
    to,
    text,
    icon = null,
    collapsed = false,
    ...props
}) => {
    const navigate = useNavigate();
    const {clearErrors} = useErrors();

    let resolved = useResolvedPath(to);
    let location = useLocation();

    const selected = location.pathname.startsWith(resolved.pathname);

    const handleButtonClick = () => {
        clearErrors();
        navigate(to);
    };

    return (
        <>
            <ListItemButton
                onClick={handleButtonClick}
                selected={selected}
                sx={{
                    bgcolor: theme.palette.menu.primary.header.background,
                    borderLeft: selected
                        ? `5px solid ${theme.palette.menu.primary.header.text}`
                        : null,
                    fontWeight: selected ? "bold" : "inherit",
                }}
                {...props}
            >
                {icon && (
                    <Tooltip title={text} placement="bottom-end">
                        <ListItemIcon
                            style={{
                                minWidth: "35px",
                                color: theme.palette.menu.primary.header.text,
                            }}
                        >
                            {icon}
                        </ListItemIcon>
                    </Tooltip>
                )}
                {!collapsed && (
                    <ListItemText
                        sx={{color: theme.palette.menu.primary.header.text}}
                        primary={text}
                    />
                )}
            </ListItemButton>
            <Divider />
        </>
    );
};

export default ModuleMenuListItemButton;
