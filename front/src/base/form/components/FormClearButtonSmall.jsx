import {Trans} from "@lingui/macro";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const FormClearButtonSmall = ({handleClear}) => {
    return (
        <IconButton aria-label="clear-filter" size="medium" onClick={handleClear}>
            <Tooltip id="clear-filter-tooltip" title={<Trans>Clear</Trans>}>
                <CancelOutlinedIcon fontSize="inherit" />
            </Tooltip>
        </IconButton>
    );
};

export default FormClearButtonSmall;
