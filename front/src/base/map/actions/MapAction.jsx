import {useState} from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";

const MapAction = ({
    actionName,
    options,
    selectedOption,
    onChange,
    icon,
    displayBadge = false,
    badgeContent = null,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOption = option => {
        onChange(option);
        handleClose();
    };

    return (
        <Box>
            <Tooltip title={actionName}>
                <Stack direction="row" alignItems="center">
                    <IconButton
                        aria-label="select-option"
                        onClick={handleClick}
                        color="primary"
                    >
                        {displayBadge ? (
                            <Badge
                                badgeContent={badgeContent || selectedOption?.value}
                                color="primary"
                            >
                                {icon}
                            </Badge>
                        ) : (
                            icon
                        )}
                    </IconButton>
                </Stack>
            </Tooltip>
            <Menu
                id="map-action-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "map-action-button",
                }}
            >
                <MenuItem
                    sx={{
                        ml: 1,
                        py: 0,
                        "&.MuiButtonBase-root:hover": {
                            bgcolor: "transparent",
                        },
                    }}
                    disableRipple
                >
                    <FormControl>
                        <FormLabel id="map-action-group-label" sx={{pb: 1}}>
                            {actionName}
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="map-action-group-label"
                            name="map-action-radio-buttons-group"
                        >
                            {options.map(option => (
                                <FormControlLabel
                                    checked={option.value === selectedOption?.value}
                                    control={<Radio />}
                                    label={option.label}
                                    onClick={() => handleOption(option)}
                                    key={option.value}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default MapAction;
