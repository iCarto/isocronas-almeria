import {Link, useMatch, useResolvedPath} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

const DropdownMenuItemLink = ({children, to, active = false, ...props}) => {
    return (
        <MenuItem
            component={Link}
            to={to}
            sx={{bgcolor: active ? "grey.100" : "inherit"}}
            {...props}
        >
            {children}
        </MenuItem>
    );
};

export default DropdownMenuItemLink;
