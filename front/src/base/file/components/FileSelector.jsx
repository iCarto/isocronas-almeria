import {useFormContext} from "react-hook-form";
import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";

import {theme} from "Theme";
import {FileUtil} from "base/file/utilities";
import {FileSelectButton} from "base/file/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const FileSelector = ({
    name,
    label,
    uploadedFile,
    onChange,
    rules = {},
    maxSize,
    disabled = false,
    errors,
}) => {
    const {_} = useLingui();

    const {getValues, trigger} = useFormContext();

    const fileToUpload = getValues()[name];

    const handleSelectFiles = async file => {
        onChange(file);
        trigger([name]);
    };

    const getFileDetails = () => {
        if (fileToUpload?.name) {
            return `${fileToUpload.name} | ${FileUtil.formatBytes(fileToUpload.size)}`;
        } else if (uploadedFile?.name)
            return `${uploadedFile.name} | ${FileUtil.formatBytes(uploadedFile.size)}`;
        else return `Máx. ${FileUtil.formatBytes(maxSize)}`;
    };

    return (
        <>
            <Stack direction="row" alignItems="center">
                <UploadFileIcon sx={{color: theme.palette.primary.main}} />
                <Stack ml={2}>
                    <Typography variant="subtitle2" lineHeight={1.5}>
                        {label}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        component="span"
                        lineHeight={1}
                    >
                        {getFileDetails()}
                        {errors[name] && (
                            <FormHelperText error>
                                {errors[name].message.toString()}
                            </FormHelperText>
                        )}
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={1}>
                <FileSelectButton
                    name={name}
                    text={_(msg`Select`)}
                    multiple={false}
                    onSelectFiles={handleSelectFiles}
                    rules={rules}
                    hideErrors
                    disabled={disabled}
                    style={{mt: 0}}
                />
            </Stack>
        </>
    );
};

export default FileSelector;
