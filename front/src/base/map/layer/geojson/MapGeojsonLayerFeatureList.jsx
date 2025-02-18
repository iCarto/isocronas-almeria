import {theme} from "Theme";

import {useMapGeojsonLayerFeatureListContext} from ".";
import MapGeojsonLayerFeatureListItem from "./MapGeojsonLayerFeatureListItem";

import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

const MapGeojsonLayerFeatureList = () => {
    const {handleClose, layerConfig, featureCollection} =
        useMapGeojsonLayerFeatureListContext();

    return (
        featureCollection &&
        featureCollection.features.length > 0 && (
            <List
                sx={{
                    height: "100%",
                    overflowY: "auto",
                    borderLeft: 1,
                    borderLeftColor: theme.palette.grey[600],
                }}
                disablePadding
            >
                <ListSubheader
                    sx={{
                        lineHeight: 2,
                        bgcolor: theme.palette.secondary.light,
                        borderBottom: `1px solid ${theme.palette.secondary.main}`,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {layerConfig.list.header || "Listado"}
                        <IconButton
                            sx={{p: 0, width: 20, height: 20}}
                            onClick={handleClose}
                        >
                            <CloseIcon sx={{fontSize: 15}} />
                        </IconButton>
                    </Stack>
                </ListSubheader>
                {featureCollection.features.map(feature => {
                    console.log({feature});
                    return (
                        <MapGeojsonLayerFeatureListItem
                            key={`feature-${feature.id}`}
                            feature={feature}
                        />
                    );
                })}
            </List>
        )
    );
};

export default MapGeojsonLayerFeatureList;
