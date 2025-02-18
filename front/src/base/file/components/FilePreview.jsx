import {useState, useEffect} from "react";

import {theme} from "Theme";
import {DocumentService} from "base/file/service";
import {FileUtil, useDownloadDocument} from "base/file/utilities";
import {useNavigateWithReload} from "base/navigation/hooks";
import {useErrors} from "base/error/provider";

import {Spinner} from "base/shared/components";
import {DeleteItemDialog} from "base/delete/components";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const FilePreview = ({
    label,
    fileId,
    disabled = false,
    onEdit = null,
    onDelete = null,
}) => {
    const {clearErrors, handleErrors} = useErrors();

    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const downloadDocument = useDownloadDocument();
    const navigate = useNavigateWithReload();

    useEffect(() => {
        setIsLoading(true);
        DocumentService.getDocument(fileId)
            .then(element => {
                clearErrors();
                setFile(element);
            })
            .catch(error => {
                handleErrors(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [fileId]);

    const handleClickFile = () => {
        downloadDocument(file.name, file.path, file.content_type);
    };

    const handleClickEdit = () => {
        onEdit(file);
    };

    const handleDelete = () => {
        setIsLoading(true);
        DocumentService.delete(file.path)
            .then(response => {
                console.log("Deleted: ", response);
                setIsLoading(false);
                navigate("", true);
            })
            .catch(error => {
                handleErrors(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
        setFile(null);
        if (onDelete) onDelete();
    };

    return isLoading ? (
        <Spinner small />
    ) : (
        <>
            <Stack direction="row" alignItems="center">
                <UploadFileIcon sx={{color: theme.palette.primary.main}} />
                <Stack ml={2}>
                    <Typography variant="subtitle2" lineHeight={1.5}>
                        {label}
                    </Typography>
                    <Typography
                        variant="caption"
                        component="span"
                        lineHeight={1}
                        sx={{
                            cursor: "pointer",
                            color: theme.palette.primary.dark,
                            "&:hover": {
                                textDecoration: "underline",
                                textDecorationColor: theme.palette.primary.light,
                            },
                        }}
                        onClick={handleClickFile}
                    >
                        {`${file?.name} | ${FileUtil.formatBytes(file?.size)}`}
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={1}>
                <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={handleClickEdit}
                    disabled={disabled}
                    color="primary"
                >
                    <ModeEditIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    size="small"
                    disabled={disabled}
                    onClick={() => {
                        setIsDeleteDialogOpen(true);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Stack>

            <DeleteItemDialog
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </>
    );
};

export default FilePreview;
