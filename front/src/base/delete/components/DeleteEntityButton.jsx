import {Trans} from "@lingui/macro";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteEntityButton = ({openDialog, disabled = false}) => {
    const handleDialog = () => {
        openDialog();
    };

    return (
        <Button
            variant="contained"
            color="error"
            disabled={disabled}
            onClick={handleDialog}
            endIcon={<DeleteIcon />}
        >
            <Trans>Delete</Trans>
        </Button>
    );
};

export default DeleteEntityButton;
