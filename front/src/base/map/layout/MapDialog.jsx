import {forwardRef} from "react";

import {APP_LOGO_PATH} from "app/l10n/config";

import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";
import {Trans} from "@lingui/macro";

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MapDialog = ({mapProvider, isDialogOpen, handleClose}) => {
    return (
        <Dialog
            fullScreen
            open={isDialogOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{position: "relative"}}>
                <Toolbar sx={{minHeight: "60px"}}>
                    <img src={APP_LOGO_PATH} height="45px" />
                    <Typography sx={{ml: 2, flex: 1}} variant="h5" component="div">
                        <Trans>Map</Trans>
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        size="small"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {mapProvider}
        </Dialog>
    );
};

export default MapDialog;
