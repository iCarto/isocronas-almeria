import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const AddNewInlineItemButton = ({
    label,
    size = "medium",
    onClick,
    disabled = false,
}) => (
    <IconButton
        aria-label="add-new-button"
        color="primary"
        size={size}
        onClick={onClick}
        disabled={disabled}
    >
        <Tooltip id="add-new-button-tooltip" title={label}>
            <AddCircleOutlineOutlinedIcon fontSize="inherit" />
        </Tooltip>
    </IconButton>
);

export default AddNewInlineItemButton;
