import {useState} from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import MotionPhotosOffIcon from "@mui/icons-material/MotionPhotosOff";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useMapContext} from "../MapProvider";

const MapBufferAction = () => {
    const {
        buffer,
        setBuffer,
        tocOptions: {
            buffer: {values: bufferValues = []},
        },
    } = useMapContext();

    const [anchorEl, setAnchorEl] = useState(null);
    const openSectorMenu = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeBuffer = buffer => {
        setBuffer(buffer);
        handleClose();
    };

    const getMenuText = () => {
        return buffer ? `${buffer} km` : null;
    };

    const getMenuIcon = () => {
        if (!buffer) {
            return <MotionPhotosOffIcon />;
        }
        return <RadioButtonCheckedIcon />;
    };

    const bufferOption = value => (
        <FormControlLabel
            key={`${value}-option`}
            checked={buffer === value}
            control={<Radio />}
            label={`${value} km`}
            onClick={() => handleChangeBuffer(value)}
        />
    );

    return (
        <Box>
            <Tooltip title="Buffer">
                <Stack direction="row" alignItems="center">
                    <IconButton
                        aria-label="select-buffer"
                        onClick={handleClick}
                        color="primary"
                    >
                        {getMenuIcon()}
                        {buffer != null && (
                            <Typography color="primary" sx={{px: 1}} variant="caption">
                                {getMenuText()}
                            </Typography>
                        )}
                    </IconButton>
                </Stack>
            </Tooltip>
            <Menu
                id="buffer-menu"
                anchorEl={anchorEl}
                open={openSectorMenu}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "buffer-button",
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
                        <FormLabel id="buffer-group-label" sx={{pb: 1}}>
                            Tamaño del buffer
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="buffer-group-label"
                            defaultValue="Sin buffer"
                            name="buffer-radio-buttons-group"
                        >
                            <FormControlLabel
                                checked={!buffer}
                                control={<Radio />}
                                label="Sin buffer"
                                onClick={() => handleChangeBuffer(null)}
                            />
                            {bufferValues.map(value => bufferOption(value))}
                        </RadioGroup>
                    </FormControl>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default MapBufferAction;
