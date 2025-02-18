import {t} from "@lingui/macro";
import {useErrors} from "base/error/provider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const DialogLayout = ({
    title = "",
    heading = null,
    label = "",
    content = null,
    contentText = "",
    isDialogOpen = false,
    mainAction: {
        color: mainActionColor = "info",
        text: mainActionText = "",
        onClick: onClickMainAction = null,
    } = {},
    secondaryAction: {
        text: secondaryActionText = t`Cancel`,
        onClick: onClickSecondaryAction = null,
    } = {},
    layout: {fullHeight = false, fullWidth = false, maxWidth = "sm", style = null} = {},
}) => {
    const {errors} = useErrors();

    const handleSecondaryAction = () => {
        onClickSecondaryAction();
    };

    const dialogStyle = fullHeight
        ? {
              "& .MuiDialog-paper": {
                  minHeight: "calc(100% - 24px)",
                  ...style,
              },
          }
        : {
              "& .MuiDialog-paper": {
                  ...style,
              },
          };

    return (
        <Dialog
            open={isDialogOpen}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            aria-labelledby={label}
            aria-describedby={label}
            sx={dialogStyle}
        >
            <DialogTitle id={label}>{title}</DialogTitle>
            {heading ? <Stack px={3}>{heading}</Stack> : null}
            <DialogContent>
                {!errors && contentText ? (
                    <DialogContentText id={`${label} dialog`}>
                        {contentText}
                    </DialogContentText>
                ) : null}
                {content}
            </DialogContent>
            {onClickSecondaryAction || onClickMainAction ? (
                <DialogActions>
                    {onClickSecondaryAction ? (
                        <Button onClick={handleSecondaryAction} autoFocus>
                            {secondaryActionText}
                        </Button>
                    ) : null}
                    {onClickMainAction ? (
                        <Button
                            onClick={onClickMainAction}
                            color={mainActionColor}
                            variant="contained"
                            disabled={!!errors}
                        >
                            {mainActionText}
                        </Button>
                    ) : null}
                </DialogActions>
            ) : null}
        </Dialog>
    );
};

export default DialogLayout;
