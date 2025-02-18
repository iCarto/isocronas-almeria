import {useEffect, useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {useRulesEngine} from "base/rules/provider";

import {theme} from "Theme";
import {useNumberUtil} from "base/i18n/utils/NumberUtil";
import {REQUIRED_FIELD} from "../validation";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const FormInputDecimal = ({
    name: propsName,
    value: propsValue = null,
    label = "",
    tooltipText = "",
    placeholder = null,
    endAdornment = null,
    decimalSize = 2,
    rules = {},
    disabled = false,
}) => {
    const {isFieldHidden, isFieldRequired} = useRulesEngine();

    const requiredRule =
        rules["required"] || (isFieldRequired(propsName) ? REQUIRED_FIELD : null);

    const formRules = {
        ...rules,
        required: requiredRule,
    };

    const {control, trigger} = useFormContext();
    const {formatDecimal, cleanDecimal, parseDecimal, getDecimalSize} = useNumberUtil();

    const {
        field,
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules: formRules,
    });
    const [value, setValue] = useState(formatDecimal(field.value, decimalSize));

    useEffect(() => {
        if (propsValue != undefined) {
            setValue(formatDecimal(propsValue, decimalSize));
        }
    }, [propsValue]);

    if (isFieldHidden(propsName)) {
        return null;
    }

    const inputLabel = requiredRule ? `${label} *` : label;

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

    const handleBlur = event => {
        trigger(propsName);
        field.onBlur();
    };

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
        <FormControl fullWidth error={Boolean(error)} margin={"dense"}>
            <TextField
                name={field.name}
                value={value}
                onChange={event => {
                    const userValue = cleanDecimal(event.target.value);
                    if (getDecimalSize(userValue) <= decimalSize) {
                        field.onChange(parseDecimal(userValue)); // data sent back to hook form
                        setValue(userValue); // UI state
                    }
                }}
                onBlur={handleBlur}
                inputRef={field.ref}
                label={getLabel()}
                placeholder={placeholder}
                InputLabelProps={{shrink: true}}
                InputProps={inputProps}
                disabled={disabled}
                error={Boolean(error)}
                helperText={error?.message}
            />
        </FormControl>
    );
};

export default FormInputDecimal;
