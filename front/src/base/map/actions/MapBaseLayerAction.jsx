import {Trans} from "@lingui/macro";
import {useState} from "react";

import {useMapContext} from "../MapProvider";
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
import Typography from "@mui/material/Typography";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";

const MapBaseLayerAction = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openBaseLayerMenu = Boolean(anchorEl);

    const {baseLayers, selectedBaseLayer, setSelectedBaseLayer} = useMapContext();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeBaseLayer = baseLayer => {
        setSelectedBaseLayer(baseLayer);
        handleClose();
    };

    return (
        <Box>
            <Tooltip title={<Trans>Base layer</Trans>}>
                <Stack direction="row" alignItems="center">
                    <IconButton
                        aria-label="select-base-layer"
                        onClick={handleClick}
                        color="primary"
                    >
                        <LayersOutlinedIcon />
                    </IconButton>
                </Stack>
            </Tooltip>
            <Menu
                id="base-layer-menu"
                anchorEl={anchorEl}
                open={openBaseLayerMenu}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "base-layer-button",
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
                        <FormLabel id="base-layer-group-label" sx={{pb: 1}}>
                            <Trans>Base layer</Trans>
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="base-layer-group-label"
                            name="base-layer-radio-buttons-group"
                        >
                            <FormControlLabel
                                checked={!selectedBaseLayer}
                                control={<Radio />}
                                label={
                                    <Typography sx={{fontStyle: "italic"}}>
                                        <Trans>Hide</Trans>
                                    </Typography>
                                }
                                onClick={() => handleChangeBaseLayer(null)}
                                key="empty"
                            />
                            {baseLayers.map(baseLayer => (
                                <FormControlLabel
                                    checked={baseLayer.code === selectedBaseLayer?.code}
                                    control={<Radio />}
                                    label={baseLayer.name}
                                    onClick={() => handleChangeBaseLayer(baseLayer)}
                                    key={baseLayer.code}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default MapBaseLayerAction;
