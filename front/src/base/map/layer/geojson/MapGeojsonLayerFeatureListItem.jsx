import {cloneElement, useState} from "react";
import {theme} from "Theme";

import {GeojsonUtil} from "base/map/utilities";
import {useMapGeojsonLayerFeatureListContext} from ".";
import {DialogLayout} from "base/dialog/components";
import {ErrorAlerts} from "base/error/components";

import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import EditLocationOutlinedIcon from "@mui/icons-material/EditLocationOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {Trans} from "@lingui/macro";

const DeleteFeatureDialog = ({isDialogOpen, setIsDialogOpen, onDelete}) => {
    const handleDialog = isOpen => {
        setIsDialogOpen(false);
    };

    const handleConfirmDeletion = () => {
        setIsDialogOpen(false);
        onDelete();
    };

    return (
        <DialogLayout
            dialogTitle={`Deseja remover a geometria deste elemento?`}
            dialogContentText={`Se clicar em Remover, o elemento não poderá ser recuperado.`}
            onMainActionClick={handleConfirmDeletion}
            mainActionText="Remover"
            mainActionColor="error"
            onHandleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

const MapGeojsonLayerFeatureListItem = ({feature}) => {
    const {
        layerConfig,
        selectedItem,
        setSelectedItem,
        editable,
        setEditable,
        handleUpdateSubmit,
        handleUpdateDelete,
        submitting,
        error,
    } = useMapGeojsonLayerFeatureListContext();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const selected = selectedItem?.id === feature.id;

    const ItemButtons = ({feature}) => {
        console.log("editable buttons", {feature});
        return GeojsonUtil.hasValidCoordinates(feature) ? (
            <Stack direction="row" spacing={1}>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{fontSize: "0.6rem"}}
                    startIcon={<EditLocationOutlinedIcon />}
                    onClick={() => {
                        setEditable(true);
                    }}
                    disabled={submitting}
                >
                    <Trans>Edit</Trans>
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        fontSize: "0.6rem",
                        minWidth: "28px",
                    }}
                    onClick={() => {
                        setDeleteDialogOpen(true);
                    }}
                    disabled={submitting}
                    color="error"
                >
                    <DeleteOutlineOutlinedIcon sx={{fontSize: "1rem"}} color="error" />
                </Button>
                <DeleteFeatureDialog
                    isDialogOpen={deleteDialogOpen}
                    setIsDialogOpen={setDeleteDialogOpen}
                    onDelete={handleUpdateDelete}
                />
            </Stack>
        ) : (
            <Button
                variant="outlined"
                size="small"
                sx={{fontSize: "0.6rem"}}
                startIcon={<AddLocationAltOutlinedIcon />}
                onClick={() => {
                    setEditable(true);
                }}
            >
                <Trans>Create</Trans>
            </Button>
        );
    };

    const EditableItemButtons = () => {
        return (
            <Stack direction="row" spacing={1}>
                <Button
                    variant="contained"
                    size="small"
                    sx={{fontSize: "0.6rem"}}
                    startIcon={<SaveOutlinedIcon />}
                    onClick={() => {
                        handleUpdateSubmit();
                    }}
                    disabled={submitting}
                >
                    {submitting ? (
                        <CircularProgress size={15} sx={{ml: 1}} />
                    ) : (
                        <Trans>Save</Trans>
                    )}
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        fontSize: "0.6rem",
                        minWidth: "28px",
                    }}
                    onClick={() => {
                        setEditable(false);
                    }}
                    disabled={submitting}
                >
                    <ClearOutlinedIcon sx={{fontSize: "0.9rem"}} />
                </Button>
            </Stack>
        );
    };

    return (
        <ListItem
            disablePadding
            sx={{
                border: GeojsonUtil.hasValidCoordinates(feature)
                    ? "1px solid lightgrey"
                    : "1px solid orange",
                bgcolor: selected ? theme.palette.grey[300] : "inherit",
                marginBottom: "2px",
                width: "220px",
            }}
        >
            <ListItemButton key={feature.properties.code}>
                <Stack sx={{width: "100%"}}>
                    <Stack direction="row" alignItems="center" sx={{width: "100%"}}>
                        <ListItemText
                            sx={{width: "100%"}}
                            primary={
                                layerConfig.list?.primary
                                    ? cloneElement(layerConfig.list.primary, {
                                          properties: feature.properties,
                                          selected,
                                      })
                                    : feature.properties.name
                            }
                            secondary={
                                layerConfig.list?.secondary
                                    ? cloneElement(layerConfig.list.secondary, {
                                          properties: feature.properties,
                                          selected,
                                      })
                                    : feature.properties.code
                            }
                            onClick={() => {
                                console.log("on click");
                                setEditable(false);
                                setSelectedItem(feature);
                            }}
                        />
                    </Stack>
                    {selected && (
                        <Stack spacing={1} sx={{width: "100%"}} alignItems="center">
                            <ErrorAlerts error={error} />
                            {!editable ? (
                                <ItemButtons feature={feature} />
                            ) : (
                                <EditableItemButtons />
                            )}
                        </Stack>
                    )}
                </Stack>
            </ListItemButton>
        </ListItem>
    );
};

export default MapGeojsonLayerFeatureListItem;
