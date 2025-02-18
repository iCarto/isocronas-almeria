import {useState} from "react";
import {useMapWMSLayerProviderContext} from "./MapWMSLayerProvider";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {MapTOCListItemIcon} from "base/map/toc";
import {MapWMSLayerTOCListItemGraphic} from ".";

const MapWMSLayerTOCListItemChild = ({legend, disabled = false, level = 1}) => {
    const {checkedLayers, setCheckedLayer} = useMapWMSLayerProviderContext();

    const [isCollapsed, setIsCollapsed] = useState(false);

    const isChecked = () => {
        return checkedLayers && checkedLayers.includes(legend.code);
    };

    return (
        <>
            <ListItem
                disablePadding
                sx={{pl: 1 * level}}
                className="LayerMenuListItem"
                secondaryAction={null}
            >
                <Box sx={{width: "27px"}}>
                    {legend.children && legend.children.length && (
                        <IconButton
                            onClick={() => {
                                setIsCollapsed(!isCollapsed);
                            }}
                            sx={{
                                p: 0,
                            }}
                        >
                            {isCollapsed ? (
                                <ArrowRightIcon
                                    sx={{
                                        color: "grey.500",
                                        fontSize: "20px",
                                    }}
                                />
                            ) : (
                                <ArrowDropDownIcon
                                    sx={{
                                        color: "grey.500",
                                        fontSize: "20px",
                                    }}
                                />
                            )}
                        </IconButton>
                    )}
                </Box>
                <Box>
                    <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        inputProps={{"aria-labelledby": "layer"}}
                        checked={isChecked()}
                        disabled={disabled}
                        onChange={event => {
                            setCheckedLayer(legend.code, event.target.checked);
                        }}
                        className="LayerMenuCheckbox"
                    />
                </Box>
                <MapTOCListItemIcon icon={legend.icon} />
                <ListItemText
                    primary={legend.label}
                    sx={{color: disabled || !isChecked() ? "grey.600" : "inherit"}}
                />
            </ListItem>
            {legend.children && legend.children.length ? (
                <Collapse in={!isCollapsed} timeout="auto" sx={{width: "100%"}}>
                    <List className="MapMenuList">
                        {legend.children.map(legendChildren => (
                            <MapWMSLayerTOCListItemChild
                                key={legendChildren.code}
                                legend={legendChildren}
                                disabled={disabled || !isChecked()}
                                level={level + 1}
                            />
                        ))}
                    </List>
                </Collapse>
            ) : legend.showGraphic && isChecked() ? (
                <MapWMSLayerTOCListItemGraphic legend={legend} />
            ) : null}
        </>
    );
};

export default MapWMSLayerTOCListItemChild;
