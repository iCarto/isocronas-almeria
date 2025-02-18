import {useState} from "react";
import {Trans} from "@lingui/macro";

import {ServiceRequestFormat} from "base/api/utilities";
import {useDownload} from "base/file/utilities";
import {useErrors} from "base/error/provider";
import {useEntityListPageContext} from "base/entity/provider";
import {useListPageGroupContext} from "base/ui/page/provider";

import {ErrorAlerts} from "base/error/components";
import {Spinner} from "base/shared/components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import ViewCompactAltOutlinedIcon from "@mui/icons-material/ViewCompactAltOutlined";

const EntityTableDownloadButton = ({sort, order}) => {
    const download = useDownload();

    const {service} = useEntityListPageContext();
    const {pageGroupFilter: filter} = useListPageGroupContext();

    const {handleErrors, clearErrors} = useErrors();

    const [anchorEl, setAnchorEl] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const openMenu = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const downloadData = format => {
        clearErrors();
        setDownloading(true);
        service
            .getList(filter, null, sort, order, format)
            .then(response => {
                download(response);
            })
            .catch(error => {
                console.log({error});
                handleErrors(error);
            })
            .finally(() => {
                setDownloading(false);
            });
    };

    const handleDownloadCSV = () => {
        downloadData(ServiceRequestFormat.CSV);
        handleClose();
    };

    /* const handleDownloadShapefile = () => {
        downloadData(ServiceRequestFormat.SHP);
        handleClose();
    }; */

    const handleDownloadExcel = () => {
        downloadData(ServiceRequestFormat.EXCEL);
        handleClose();
    };

    return downloading ? (
        <Spinner small={true} />
    ) : (
        <div>
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
            <ErrorAlerts />
        </div>
    );
};

export default EntityTableDownloadButton;
