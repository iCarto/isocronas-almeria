import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {Trans} from "@lingui/macro";

import FileSelectButton from "./FileSelectButton";
import PendingFile from "./PendingFile";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadIcon from "@mui/icons-material/Upload";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

const SelectFileSection = ({formFilesName, formFileInputName, rules}) => {
    const {
        getValues,
        control,
        formState: {errors},
        trigger,
    } = useFormContext();

    const {
        field: {onChange},
    } = useController({name: formFilesName, control, rules});

    const [isDropAreaActive, setIsDropAreaActive] = useState(false);

    const handleSelectFiles = async fileList => {
        handleAdd(fileList);
    };

    const handleDropFile = async event => {
        event.preventDefault();
        setIsDropAreaActive(false);
        var selectedFiles = Array.from(event.dataTransfer.files);
        handleAdd(selectedFiles);
    };

    const handleDragOver = event => {
        event.preventDefault();
        setIsDropAreaActive(true);
    };

    const handleDragLeave = () => {
        setIsDropAreaActive(false);
    };

    const handleAdd = files => {
        const values = getValues();
        const updatedFileList = [...values[formFilesName], ...files];
        onChange(updatedFileList);
        trigger([formFilesName]);
    };

    const handleRemove = fileToRemove => {
        const values = getValues();
        const updatedFileList = values[formFilesName].filter(
            file => file.name !== fileToRemove.name
        );
        onChange(updatedFileList);
        trigger([formFilesName]);
    };

    const handleCancel = () => {
        const updatedFileList = [];
        onChange(updatedFileList);
    };

    const fileList = getValues()[formFilesName];

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDropFile}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "200px",
                        p: 3,
                        border: "1px solid grey",
                        borderRadius: 5,
                        backgroundColor: isDropAreaActive ? "none" : "grey.100",
                    }}
                >
                    <CloudUploadIcon sx={{color: "grey.500"}} fontSize="large" />
                    <Typography>
                        {isDropAreaActive ? (
                            <Trans>Drop your files</Trans>
                        ) : (
                            <Trans>Drag your files here</Trans>
                        )}
                    </Typography>
                    <Typography>o</Typography>
                    <FileSelectButton
                        name={formFileInputName}
                        onSelectFiles={handleSelectFiles}
                    />
                </Box>
            </Grid>
            {errors[formFilesName] && (
                <Grid item xs={12}>
                    <Alert severity="error" sx={{mt: 2}}>
                        {errors[formFilesName].message}
                    </Alert>
                </Grid>
            )}
            {fileList.length > 0 && (
                <Grid
                    item
                    container
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <List dense>
                            <ListSubheader sx={{textTransform: "uppercase"}}>
                                <Trans>Selected files</Trans>
                            </ListSubheader>
                            {fileList.map(file => {
                                return (
                                    <PendingFile
                                        key={file.name}
                                        file={file}
                                        onRemove={handleRemove}
                                    />
                                );
                            })}
                        </List>
                    </Grid>
                    <Grid item justifyContent="center">
                        <Button color="inherit" onClick={handleCancel}>
                            <Trans>Cancel</Trans>
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={errors[formFilesName] != null}
                            startIcon={<UploadIcon />}
                            sx={{ml: 3}}
                        >
                            <Trans>Upload files</Trans>
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default SelectFileSection;
