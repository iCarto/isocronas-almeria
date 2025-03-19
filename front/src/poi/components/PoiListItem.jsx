import {createElement} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {usePoiCategoryUtil} from "poi/utils";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {theme} from "Theme";
import {usePoisIsochroneContext} from "poi/map";

const PoiListItem = ({element}) => {
    const {selectedElement, setSelectedElement} = usePoisIsochroneContext();

    const {getStyleForCategory} = usePoiCategoryUtil();

    const categoryStyle = getStyleForCategory(element.category);
    const categoryIcon = categoryStyle.icon;
    const categoryColor = categoryStyle.color;

    const selected = selectedElement === element.id;

    return (
        <ListItem
            disablePadding
            sx={{borderBottom: `1px solid ${theme.palette.grey[300]}`}}
            onClick={() => {
                selectedElement === element.id
                    ? setSelectedElement(null)
                    : setSelectedElement(element.id);
            }}
        >
            <ListItemButton
                selected={selected}
                sx={{
                    pl: 1,
                    "&.Mui-selected": {
                        backgroundColor: "white",
                    },
                }}
            >
                <Stack direction="row" spacing={1}>
                    {createElement(categoryIcon, {
                        fontSize: "small",
                        sx: {color: categoryColor},
                    })}
                    <Grid item xs={11}>
                        <Stack>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                fontSize={13}
                                color={selected ? "#2e85cb" : theme.palette.grey[700]}
                            >
                                {element.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                fontSize={11}
                                color={theme.palette.grey[600]}
                            >
                                {element.poi_type}
                            </Typography>
                            <Typography
                                variant="caption"
                                fontSize={10}
                                color={theme.palette.grey[500]}
                            >
                                {element.address}
                            </Typography>
                        </Stack>
                    </Grid>
                </Stack>
            </ListItemButton>
        </ListItem>
    );
};

export default PoiListItem;
