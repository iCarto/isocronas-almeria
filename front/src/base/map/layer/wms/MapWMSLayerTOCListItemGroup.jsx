import {useState} from "react";
import {useMapWMSLayerProviderContext} from "./MapWMSLayerProvider";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MapWMSLayerTOCListItemChild from "./MapWMSLayerTOCListItemChild";
import List from "@mui/material/List";

import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const MapWMSLayerTOCListItemGroup = () => {
    const {
        layerConfig: {legend},
        visible,
        setVisible,
    } = useMapWMSLayerProviderContext();

    const [isCollapsed, setIsCollapsed] = useState(false);

    const getLegendIcon = attribute => {
        return (
            legend.color && (
                <Box
                    className="LayerMenuIcon"
                    sx={{
                        backgroundColor: legend.color,
                    }}
                >
                    {legend.icon}
                </Box>
            )
        );
    };

    return (
        <>
            <ListItem
                disablePadding
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
                        checked={visible}
                        onChange={event => {
                            setVisible(event.target.checked);
                        }}
                        className="LayerMenuCheckbox"
                    />
                </Box>
                {getLegendIcon("")}
                <ListItemText primary={legend.label} />
            </ListItem>
            {legend.children && legend.children.length ? (
                <Collapse in={!isCollapsed} timeout="auto" sx={{width: "100%"}}>
                    <List className="MapMenuList">
                        {legend.children.map(legendChildren => (
                            <MapWMSLayerTOCListItemChild
                                legend={legendChildren}
                                key={legendChildren.code}
                                disabled={!visible}
                            />
                        ))}
                    </List>
                </Collapse>
            ) : null}
        </>
    );
};

export default MapWMSLayerTOCListItemGroup;
