import {useLingui} from "@lingui/react";
import {msg, Trans} from "@lingui/macro";

import {FileUtil} from "base/file/utilities";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

const UploadingFileItem = ({file: uploadingFile, onCancel, onRemove}) => {
    const {_} = useLingui();

    const getCancelAction = () => {
        return (
            uploadingFile.progress !== 100 && (
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onCancel(uploadingFile)}
                >
                    <CancelIcon />
                </IconButton>
            )
        );
    };

    const getPendingSizeInfo = () => {
        return (
            <Trans>
                {_(msg`Uploaded`) +
                    " " +
                    FileUtil.formatBytes(
                        uploadingFile.file.size * (uploadingFile.progress / 100)
                    ) +
                    " " +
                    _(msg`of`) +
                    " " +
                    FileUtil.formatBytes(uploadingFile.file.size)}
            </Trans>
        );
    };

    if (uploadingFile.error) {
        return (
            <ListItem divider>
                <ListItemText>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    onRemove(uploadingFile);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {uploadingFile.name + ": " + uploadingFile.error}
                    </Alert>
                </ListItemText>
            </ListItem>
        );
    } else if (uploadingFile.stored) {
        return (
            <ListItem divider>
                <ListItemText>
                    <Alert severity="success">
                        {uploadingFile.name +
                            " " +
                            _(msg`has been uploaded successfully.`)}
                    </Alert>
                </ListItemText>
            </ListItem>
        );
    } else {
        return (
            <ListItem divider secondaryAction={getCancelAction()}>
                <ListItemIcon>
                    <CircularProgress
                        variant="determinate"
                        value={uploadingFile.progress}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={uploadingFile.name}
                    secondary={getPendingSizeInfo()}
                />
            </ListItem>
        );
    }
};

export default UploadingFileItem;
