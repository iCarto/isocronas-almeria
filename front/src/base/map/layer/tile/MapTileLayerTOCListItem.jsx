import {useMapTileLayerProviderContext} from "./MapTileLayerProvider";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

const MapTileLayerTOCListItem = () => {
    const {
        layerConfig: {legend, visible, setVisible},
    } = useMapTileLayerProviderContext();

    const getLegendIcon = attribute => {
        return (
            <Box
                className="LayerMenuIcon"
                sx={{
                    backgroundColor: legend.color,
                }}
            >
                {legend.icon}
            </Box>
        );
    };

    return (
        <>
            <ListItem
                disablePadding
                sx={{pl: 2}}
                className="LayerMenuListItem"
                secondaryAction={null}
            >
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
        </>
    );
};

export default MapTileLayerTOCListItem;
