import {useState} from "react";
import {Trans} from "@lingui/macro";

import {useDownloadMapAsPng} from "./hooks";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const MapImageAction = () => {
    const [loading, setLoading] = useState(false);

    const {download: handleDownloadMapAsPng} = useDownloadMapAsPng();

    const handleDownload = () => {
        setLoading(true);
        handleDownloadMapAsPng(() => setLoading(false));
    };

    return (
        <Box
            sx={{
                width: "40px",
                height: "40px",
            }}
        >
            {loading ? (
                <CircularProgress size={22} sx={{ml: 1, mt: 1}} />
            ) : (
                <Tooltip title={<Trans>Download as image</Trans>}>
                    <IconButton
                        aria-label="download-image"
                        onClick={handleDownload}
                        color="primary"
                    >
                        <ImageOutlinedIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
};

export default MapImageAction;
