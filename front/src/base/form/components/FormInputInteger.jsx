import {useState} from "react";
import {useRulesEngine} from "base/rules/provider";
import {useController, useFormContext} from "react-hook-form";
import {theme} from "Theme";
import {useNumberUtil} from "base/i18n/utils/NumberUtil";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {REQUIRED_FIELD} from "../validation";

const WAIT_INTERVAL = 500;
let timerID;

const FormInputInteger = ({
    name: propsName,
    label = "",
    onFocusHandler = null,
    onBlurHandler = null,
    tooltipText = "",
    endAdornment = null,
    placeholder = null,
    maxLength = null,
    disabled = false,
    rules = {},
}) => {
    const {isFieldHidden, isFieldRequired} = useRulesEngine();

    const required =
        rules["required"] ||
        (isFieldRequired(propsName) ? REQUIRED_FIELD.required : null);
    const formRules = {
        ...rules,
        required,
    };

    const {formatInteger, cleanInteger} = useNumberUtil();
    const {control, trigger} = useFormContext();

    const {
        field,
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules: formRules,
    });

    if (isFieldHidden(propsName)) {
        return null;
    }

    const [value, setValue] = useState(formatInteger(field.value));

    const inputLabel = formRules && formRules["required"] ? `${label} *` : label;

    const handleBlur = event => {
        trigger(propsName);
        field.onBlur();
        if (onBlurHandler) {
            onBlurHandler(event);
        }
    };

    const handleFocus = event => {
        trigger(propsName);
        if (onFocusHandler) {
            onFocusHandler(event);
        }
    };

    const handleChange = event => {
        const formValue = cleanInteger(event.target.value);
        const formattedValue = formatInteger(formValue);

        const cursorPosition = event.target.selectionStart;
        // Offset caused by thousand separator in formatted value
        const cursorOffset = formattedValue.length - event.target.value.length;

        const element = event.target;

        setValue(formattedValue); // UI state

        // Control cursor position after rerender caused by value state update
        window.requestAnimationFrame(() => {
            element.selectionStart = cursorPosition + cursorOffset;
            element.selectionEnd = cursorPosition + cursorOffset;
        });

        debounceFieldChange(formValue);
    };

    const debounceFieldChange = value => {
        clearTimeout(timerID);

        timerID = setTimeout(() => {
            field.onChange(parseInt(value)); // Data sent back to hook form
        }, WAIT_INTERVAL);
    };

    let inputProps = {};
    if (endAdornment) {
        inputProps = {
            ...inputProps,
            endAdornment: endAdornment && (
                <InputAdornment
                    position="end"
                    disableTypography
                    sx={{fontSize: theme.typography.fontSize}}
                >
                    {endAdornment}
                </InputAdornment>
            ),
        };
    }

    const getLabel = () => {
        return tooltipText ? (
            <Box display="flex" alignItems="center" marginRight="-8px">
                {inputLabel}
                {
                    <Tooltip title={tooltipText} arrow enterDelay={500}>
                        <InfoOutlinedIcon
                            fontSize="small"
                            sx={{mx: 1, color: "grey.500"}}
                        />
                    </Tooltip>
                }
            </Box>
        ) : (
            inputLabel
        );
    };

    return (
        <FormControl fullWidth error={Boolean(error)} margin="dense">
            <TextField
                name={field.name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                inputRef={field.ref}
                label={getLabel()}
                placeholder={placeholder}
                InputLabelProps={{shrink: true}}
                InputProps={inputProps}
                inputProps={{maxLength: maxLength}}
                disabled={disabled}
                error={Boolean(error)}
                helperText={error?.message}
            />
        </FormControl>
    );
};

export default FormInputInteger;
