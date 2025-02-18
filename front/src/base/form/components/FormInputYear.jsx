import {useState, useEffect} from "react";
import {useController, useFormContext} from "react-hook-form";
import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";

import {useRulesEngine} from "base/rules/provider";
import {REQUIRED_FIELD} from "../validation";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const FormInputYear = ({
    name: propsName,
    label = "",
    onFocusHandler = null,
    onBlurHandler = null,
    tooltipText = "",
    placeholder = null,
    disabled = false,
    rules = {},
}) => {
    const {_} = useLingui();
    const {isFieldHidden, isFieldRequired} = useRulesEngine();

    const required =
        rules["required"] ||
        (isFieldRequired(propsName) ? REQUIRED_FIELD.required : null);
    const formRules = {
        ...rules,
        required,
        validate: value => {
            if (value && (value.length !== 4 || isNaN(value)))
                return _(msg`Enter a valid year (4 digits)`);
            const year = parseInt(value, 10);
            if (year < 1900 || year > 2100)
                return _(msg`Enter a year between 1900 and 2100`);
            return true;
        },
    };

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

    const [value, setValue] = useState(field.value || "");

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
        const formValue = event.target.value.replace(/\D/g, ""); // Solo permite dígitos
        setValue(formValue.slice(0, 4)); // Limita la longitud a 4
        field.onChange(formValue.slice(0, 4)); // Envía el valor a RHF
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
                inputProps={{maxLength: 4}}
                disabled={disabled}
                error={Boolean(error)}
                helperText={error?.message}
            />
        </FormControl>
    );
};

export default FormInputYear;
