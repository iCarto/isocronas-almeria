import {useEffect, useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {Trans} from "@lingui/macro";
import {useRulesEngine} from "base/rules/provider";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {REQUIRED_FIELD} from "../validation";

const FormComboBox = ({
    name: propsName,
    label,
    options,
    handleSelect = null,
    placeholder = null,
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

    const {control} = useFormContext();

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

    const [value, setValue] = useState(field.value);
    const [resetKey, setResetKey] = useState(0);

    const inputLabel = formRules && formRules["required"] ? `${label} *` : label;

    useEffect(() => {
        setResetKey(prevKey => prevKey + 1); // Force re-render in order to clear value when options change
        field.onChange(null);
    }, [options]);

    return (
        <Autocomplete
            fullWidth
            disablePortal
            key={resetKey}
            id={`${propsName}-combo-search-box`}
            options={options}
            onChange={(event, option) => {
                const userValue = option?.id;
                field.onChange(userValue);
                setValue(userValue);
                event.preventDefault();
                if (handleSelect) {
                    handleSelect(option, propsName);
                }
            }}
            isOptionEqualToValue={(option, value) => {
                return value && value !== "" && option.id === value.id;
            }}
            renderInput={params => (
                <TextField
                    value={value}
                    name={field.name}
                    label={inputLabel}
                    placeholder={placeholder}
                    error={Boolean(error)}
                    helperText={error?.message}
                    disabled={disabled}
                    {...params}
                    InputLabelProps={{shrink: true}}
                />
            )}
            noOptionsText={<Trans>No options available</Trans>}
        />
    );
};

export default FormComboBox;
