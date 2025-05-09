import {Trans} from "@lingui/macro";

import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";

const FormClearButton = ({handleClear}) => {
    return (
        <Button color="primary" variant="outlined" sx={{mt: 1}} onClick={handleClear}>
            <ClearIcon /> <Trans>Clear</Trans>
        </Button>
    );
};

export default FormClearButton;
