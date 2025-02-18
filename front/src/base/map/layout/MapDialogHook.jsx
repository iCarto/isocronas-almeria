import {cloneElement, useState} from "react";
import {Trans} from "@lingui/macro";

import {MapDialog} from "base/map/layout";

import Button from "@mui/material/Button";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

export function useMapDialog() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [dirty, setDirty] = useState(false);

    const handleClickEdit = () => {
        setIsCreateDialogOpen(true);
    };

    const handleClickClose = () => {
        setIsCreateDialogOpen(false);
    };

    const button = (
        <Button
            variant="contained"
            onClick={() => {
                handleClickEdit();
            }}
            startIcon={<MapOutlinedIcon />}
        >
            <Trans>Open map</Trans>
        </Button>
    );

    const getDialog = (mapProvider, onClose = null) => (
        <MapDialog
            mapProvider={cloneElement(mapProvider, {
                markAsDirty: () => {
                    setDirty(true);
                },
            })}
            isDialogOpen={isCreateDialogOpen}
            handleClose={() => {
                handleClickClose();
                if (onClose) {
                    onClose(dirty);
                }
            }}
        />
    );

    return {button, getDialog};
}
