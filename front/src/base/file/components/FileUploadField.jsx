import {useState, useEffect} from "react";
import {useController, useFormContext} from "react-hook-form";

import {FileValidation} from "base/file/utilities";
import {FilePreview, FileSelector} from "base/file/components";
import Stack from "@mui/material/Stack";

const FileUploadField = ({name, label, rules = {}, maxSize, disabled = false}) => {
    const [view, setView] = useState("select");
    const [uploadedFile, setUploadedFile] = useState(null);

    const {control, resetField} = useFormContext();
    const {
        field: {value, onChange},
        formState: {errors, dirtyFields},
    } = useController({
        name: name,
        control,
        rules: {
            ...rules,
            validate: {
                checkFile: file => {
                    // Validate only if input value has changed; if unchanged, the input value is the file id instead of a File instance, which does not pass the validation
                    if (dirtyFields[name]) {
                        return file
                            ? FileValidation.validateFile(file, null, maxSize)
                            : true;
                    }
                    return true;
                },
            },
        },
    });

    const inputLabel = rules && rules["required"] ? `${label} *` : label;

    useEffect(() => {
        if (value) setView("preview");
    }, []);

    const handleChangeView = file => {
        setView("select");
        setUploadedFile(file);
    };

    const handleDeleteFile = () => {
        resetField(name);
        setView("select");
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={1}
            sx={{
                border: 1,
                borderColor: "grey.400",
                borderRadius: 1,
                backgroundColor: "white",
            }}
        >
            {view === "preview" ? (
                <FilePreview
                    label={inputLabel}
                    fileId={value}
                    disabled={disabled}
                    onEdit={handleChangeView}
                    onDelete={handleDeleteFile}
                />
            ) : (
                <FileSelector
                    name={name}
                    label={inputLabel}
                    uploadedFile={uploadedFile}
                    onChange={onChange}
                    maxSize={maxSize}
                    rules={rules}
                    disabled={disabled}
                    errors={errors}
                />
            )}
        </Stack>
    );
};

export default FileUploadField;
