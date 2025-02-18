import {useCallback, useRef} from "react";
import {useController, useFormContext} from "react-hook-form";
import {t} from "@lingui/macro";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const FileSelectButton = ({
    name,
    text = t`Select files on the disk`,
    onSelectFiles = null,
    multiple = true,
    hideErrors = false,
    rules = {},
    style = {},
    disabled = false,
}) => {
    // Based on https://stackblitz.com/edit/input-file-react-hook-form

    const {
        control,
        trigger,
        formState: {errors},
    } = useFormContext();

    const {
        field: {ref, onChange},
    } = useController({name, control, rules});

    const handleSelectFiles = useCallback(
        async event => {
            const files = event.target.files;
            if (files.length > 0) {
                if (multiple) {
                    onChange(files);
                    if (onSelectFiles) {
                        const selectedFiles = Array.from(files);
                        onSelectFiles(selectedFiles);
                    }
                } else {
                    onChange(files[0]);
                    if (onSelectFiles) {
                        onSelectFiles(files[0]);
                    }
                }
                trigger([name]);
            }
        },
        [name, onSelectFiles, onChange, trigger]
    );

    const inputRef = useRef(null);

    const triggerInputClick = () => {
        inputRef.current.click();
    };

    return (
        <>
            <input
                type="file"
                multiple={multiple}
                hidden
                ref={event => {
                    ref(event);
                    inputRef.current = event;
                }}
                onChange={handleSelectFiles}
            />
            <Button
                onClick={triggerInputClick}
                variant="outlined"
                sx={{mt: 3, ...style}}
                disabled={disabled}
            >
                {text}
            </Button>
            {!hideErrors
                ? errors[name] && (
                      <Alert severity="error">{errors[name].message.toString()}</Alert>
                  )
                : null}
        </>
    );
};

export default FileSelectButton;
