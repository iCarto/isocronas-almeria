import {createElement} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {usePoiCategoryUtil} from "poi/utils";

const PoiListItem = ({feature}) => {
    const properties = feature.properties;

    const {getStyleForCategory} = usePoiCategoryUtil();

    const categoryStyle = getStyleForCategory(feature.properties.category);
    const categoryIcon = categoryStyle.icon;
    const categoryColor = categoryStyle.color;

    return (
        <ListItem disablePadding className="LayerMenuListItem">
            <ListItemButton sx={{pl: 2}}>
                <ListItemIcon sx={{p: 0, minWidth: 32}}>
                    {createElement(categoryIcon, {
                        fontSize: "small",
                        sx: {color: categoryColor},
                    })}
                </ListItemIcon>
                <ListItemText
                    primary={properties.name}
                    secondary={`${properties.category} - ${properties.municipality}`}
                />
            </ListItemButton>
        </ListItem>
    );
};

export default PoiListItem;
