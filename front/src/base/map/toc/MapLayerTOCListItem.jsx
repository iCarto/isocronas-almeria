import {MapTOCListItemIcon} from ".";

import {ErrorUtil} from "base/error/utilities";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";

const MapLayerTOCListItem = ({
    legend,
    layerStyle = null,
    visible,
    setVisible,
    selected = false,
    loading = false,
    error = null,
    secondaryAction = null,
    discriminatorLegend = null,
}) => {
    console.log({error});
    return (
        <Box sx={{bgcolor: selected ? "white" : "inherit"}}>
            <ListItem
                disablePadding
                className="LayerMenuListItem"
                secondaryAction={secondaryAction}
            >
                <Stack justifyContent="center" alignItems="center" sx={{pl: 1}}>
                    {error ? (
                        <Tooltip title={error}>
                            <WarningAmberOutlinedIcon
                                color="error"
                                sx={{fontSize: 16, mr: 1}}
                            />
                        </Tooltip>
                    ) : loading ? (
                        <CircularProgress size={12} sx={{mr: 1}} />
                    ) : selected ? (
                        <ArrowLeftOutlinedIcon sx={{fontSize: 15, mr: 1}} />
                    ) : (
                        <Checkbox
                            tabIndex={-1}
                            disableRipple
                            inputProps={{"aria-labelledby": "layer"}}
                            checked={visible}
                            onChange={event => {
                                setVisible(event.target.checked);
                            }}
                            className="LayerMenuCheckbox"
                        />
                    )}
                </Stack>
                <MapTOCListItemIcon icon={legend.icon} defaultStyle={layerStyle} />
                <ListItemText
                    primary={legend.label}
                    primaryTypographyProps={{fontWeight: selected ? "bold" : "inherit"}}
                />
            </ListItem>
            {visible && !loading && !error ? discriminatorLegend : null}
        </Box>
    );
};

export default MapLayerTOCListItem;
