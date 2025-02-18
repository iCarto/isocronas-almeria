import {useState} from "react";
import {useLingui} from "@lingui/react";
import {msg, t} from "@lingui/macro";

import {useErrors} from "base/error/provider";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";

const DownloadPDFButton = ({
    onClick,
    text = t`Download PDF`,
    color = "primary",
    isLoading = false,
    disabled = false,
}) => {
    const {_} = useLingui();

    return (
        <Tooltip title={_(msg`Download PDF`)}>
            <Button
                aria-label="download-PDF"
                onClick={onClick}
                variant="contained"
                startIcon={<PrintOutlinedIcon />}
                disabled={disabled || isLoading}
                sx={{width: "fit-content"}}
                color={color}
            >
                {text}
                {isLoading && <CircularProgress size={22} sx={{ml: 1, mt: 1}} />}
            </Button>
        </Tooltip>
    );
};

export default DownloadPDFButton;
