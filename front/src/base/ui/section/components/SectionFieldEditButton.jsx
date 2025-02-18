import {Trans} from "@lingui/macro";

import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const SectionFieldEditButton = ({onClick}) => {
    return (
        <Tooltip title={<Trans>Edit file</Trans>}>
            <IconButton
                sx={{
                    mt: "-12px",
                    ml: 4,
                }}
                onClick={() => {
                    onClick();
                }}
            >
                <EditIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    );
};

export default SectionFieldEditButton;
