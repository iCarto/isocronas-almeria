import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";

import {useRulesEngine} from "base/rules/provider";
import {REQUIRED_FIELD} from "base/form/validation";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

const FormSelect = ({
    name: propsName,
    label = "",
    options,
    defaultValue = null,
    rules = {},
    onChangeHandler = null,
    showEmptyOption = true,
    multiple = false,
    disabled = false,
}) => {
    const {_} = useLingui();
    const {isFieldHidden, isFieldRequired} = useRulesEngine();

    const required =
        (rules && rules["required"]) ||
        (isFieldRequired(propsName) ? REQUIRED_FIELD.required : null);

    const formRules = {
        ...rules,
        required,
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

    const placeholderValue = "placeholder";
    const valueIsSet = field.value || field.value === false;

    const [value, setValue] = useState(valueIsSet ? field.value : placeholderValue);

    if (isFieldHidden(propsName)) {
        return null;
    }

    const inputLabel = formRules && formRules["required"] ? `${label} *` : label;

    const emptyOption = {
        value: "",
        label: "‌‌", // This is not an empty character. It's U+200C unicode character.
    };

    return (
        <FormControl fullWidth error={Boolean(error)} margin="dense">
            <InputLabel id={`${field.name}-label`} shrink>
                {inputLabel}
            </InputLabel>
            <Select
                labelId={`${field.name}-label`}
                name={field.name}
                inputRef={field.ref}
                value={defaultValue || field.value}
                label={inputLabel}
                onChange={event => {
                    event.preventDefault();
                    setValue(event.target.value);
                    field.onChange(event);
                    if (onChangeHandler) {
                        onChangeHandler(event.target.value, propsName);
                    }
                    trigger(propsName);
                }}
                disabled={disabled}
                multiple={multiple}
                notched
                placeholder={_(msg`Select`)}
            >
                {value === placeholderValue && !showEmptyOption ? (
                    <MenuItem
                        value={placeholderValue}
                        sx={{
                            fontStyle: "italic",
                        }}
                        disabled
                    >
                        {options
                            ? _(msg`Select an option from the list`)
                            : _(msg`No options available`)}
                    </MenuItem>
                ) : null}
                {(showEmptyOption && options
                    ? [emptyOption, ...options]
                    : options
                )?.map(({label, value, disabled = false}) => (
                    <MenuItem key={value} value={value} disabled={disabled}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
            {error?.message ? <FormHelperText>{error?.message}</FormHelperText> : null}
        </FormControl>
    );
};

export default FormSelect;
