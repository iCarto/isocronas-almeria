import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {t} from "@lingui/macro";

import {ImageFilePreview, ImagePreview, ImageUploadButton} from ".";
import {ContainerWithLabel} from "base/ui/containers";
import {ErrorAlerts} from "base/error/components";

import Grid from "@mui/material/Grid";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";

//TO-DO: Make this consistent with code in FileValidation.js
const validateSize = (imageFile, label) => {
    if (!(imageFile instanceof File)) {
        return null;
    }
    if (!validateFileType(imageFile, ["image/jpg", "image/jpeg", "image/png"])) {
        return t`The file for "${label}" must be of type jpg, jpeg o png.`;
    }
    if (!validateFileMaxSize(imageFile, 20000000)) {
        return t`The file for "${label}" cannot exceed 20Mb\n`;
    }
    return null;
};

const validateFileType = (file, fileTypes) => {
    return fileTypes.includes(file.type);
};

const validateFileMaxSize = (file, maxSize) => {
    return file.size <= maxSize;
};

const ImageUploadFormSection = ({name, label, formFileInputName}) => {
    const {
        getValues,
        control,
        formState: {errors},
        trigger,
    } = useFormContext();

    const {
        field: {onChange},
    } = useController({
        name: name,
        control,
        rules: {validate: imageFile => validateSize(imageFile, label)},
    });

    const [isDropAreaActive, setIsDropAreaActive] = useState(false);

    // TO-DO: Prevent adding file to fileList if validation fails. Functions are only getting errors[name] on next upload ??
    const fileImage = getValues()[name];

    const handleSelectFiles = async fileList => {
        handleAdd(fileList[0]);
    };

    const handleDropFile = async event => {
        event.preventDefault();
        setIsDropAreaActive(false);
        var selectedFile = Array.from(event.dataTransfer.files)[0];
        handleAdd(selectedFile);
    };

    const handleDragOver = event => {
        event.preventDefault();
        setIsDropAreaActive(true);
    };

    const handleDragLeave = () => {
        setIsDropAreaActive(false);
    };

    const handleAdd = file => {
        onChange(file);
        trigger([name]);
    };

    const handleRemove = file => {
        onChange(null);
        trigger([name]);
    };

    return (
        <ContainerWithLabel isAreaActive={isDropAreaActive}>
            <Grid
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDropFile}
            >
                <ImageListItem>
                    {fileImage ? (
                        fileImage instanceof File ? (
                            <ImageFilePreview image={fileImage} width="100%" />
                        ) : (
                            <ImagePreview path={fileImage} />
                        )
                    ) : (
                        <ImageUploadButton
                            name={formFileInputName}
                            onSelectFiles={handleSelectFiles}
                        />
                    )}

                    <ImageListItemBar
                        position="below"
                        title={`${label}`}
                        actionIcon={
                            fileImage && (
                                <IconButton
                                    sx={{
                                        color: "grey.400",
                                    }}
                                    aria-label={t`Delete ${label}`}
                                    onClick={() => handleRemove(fileImage)}
                                >
                                    <CancelIcon
                                        sx={{
                                            fontSize: 20,
                                        }}
                                    />
                                </IconButton>
                            )
                        }
                    />
                </ImageListItem>
            </Grid>
            {errors[name] && (
                <Grid mt={2}>
                    <ErrorAlerts error={errors[name]} sx={{fontSize: "0.8em"}} />
                </Grid>
            )}
        </ContainerWithLabel>
    );
};

export default ImageUploadFormSection;
