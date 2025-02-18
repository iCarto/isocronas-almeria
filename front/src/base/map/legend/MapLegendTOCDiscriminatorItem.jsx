import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {useMapLayerDiscriminatorContext} from "../layer/geojson/MapGeojsonLayerDiscriminatorProvider";
import Box from "@mui/material/Box";
import {SVGUtil} from "../svg";

const MapLegendTOCDiscriminatorItem = ({discriminator, discriminatorItem}) => {
    const {checkedDiscriminatorItems, setCheckedDiscriminatorItem} =
        useMapLayerDiscriminatorContext();

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(checkedDiscriminatorItems.includes(discriminatorItem.code));
    }, [checkedDiscriminatorItems]);

    return (
        <ListItem disablePadding className="LayerMenuLegendItem">
            <IconButton
                onClick={event => {
                    setCheckedDiscriminatorItem(discriminatorItem.code, !visible);
                }}
                className="LayerMenuLegendItemButton"
            >
                {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
            <Box>
                <div
                    dangerouslySetInnerHTML={{
                        __html:
                            discriminator.style === "points"
                                ? SVGUtil.getCircle(10, discriminatorItem.style)
                                : SVGUtil.getSquare(10, discriminatorItem.style),
                    }}
                />
            </Box>
            {discriminatorItem.label && (
                <ListItemText
                    primary={discriminatorItem.label}
                    className="LayerMenuLegendItemText"
                />
            )}
        </ListItem>
    );
};

export default MapLegendTOCDiscriminatorItem;
