import {useState} from "react";
import {Trans} from "@lingui/macro";

import {useDownload} from "base/file/utilities";
import {useErrors} from "base/error/provider";
import {ServiceRequestFormat} from "base/api/utilities";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import ViewCompactAltOutlinedIcon from "@mui/icons-material/ViewCompactAltOutlined";

const TableDownloadButton = ({service}) => {
    const download = useDownload();

    const {handleErrors, clearErrors} = useErrors();

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const downloadData = format => {
        clearErrors();
        service(format)
            .then(response => {
                download(response);
            })
            .catch(error => {
                handleErrors(error);
            });
    };

    const handleDownloadCSV = () => {
        downloadData(ServiceRequestFormat.CSV);
        handleClose();
    };

    const handleDownloadExcel = () => {
        downloadData(ServiceRequestFormat.EXCEL);
        handleClose();
    };

    return (
        <>
            <Tooltip title={<Trans>Download table</Trans>} placement="bottom-end">
                <IconButton aria-label="download-table" onClick={handleClick}>
                    <DownloadOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleDownloadExcel}>
                    <ListItemIcon>
                        <ViewCompactAltOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Trans>Excel</Trans>
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDownloadCSV}>
                    <ListItemIcon>
                        <TextSnippetOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Trans>CSV</Trans>
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default TableDownloadButton;
