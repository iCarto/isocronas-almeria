import {Trans} from "@lingui/macro";
import {useDownloadDocument} from "base/file/utilities";

import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const FeaturedDocumentDownload = ({featuredDocument}) => {
    const downloadFile = useDownloadDocument();

    const handleClick = async () => {
        downloadFile(
            featuredDocument.name,
            featuredDocument.path,
            featuredDocument.content_type
        );
    };

    return (
        <Grid item container justifyContent="flex-start">
            <Tooltip title={<Trans>Download file</Trans>} placement="bottom-end">
                <Button
                    aria-label="download-file"
                    onClick={() => handleClick()}
                    startIcon={<InsertDriveFileOutlinedIcon />}
                    variant="outlined"
                >
                    <Trans>Download</Trans>
                </Button>
            </Tooltip>
        </Grid>
    );
};

export default FeaturedDocumentDownload;
