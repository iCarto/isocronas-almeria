import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const FormSelectUncontrolled = ({
    label = "",
    placeholderValue = "",
    options,
    rules = {},
    onChange = null,
    showEmptyOption = true,
    multiple = false,
    disabled = false,
}) => {
    const {_} = useLingui();

    const inputLabel = rules && rules["required"] ? `${label} *` : label;

    const emptyOption = {
        value: "",
        label: "‌‌", // This is not an empty character. It's U+200C unicode character.
    };

    return (
        <FormControl fullWidth margin="dense">
            <InputLabel id={`${label}-label`} shrink>
                {inputLabel}
            </InputLabel>
            <Select
                labelId={`${label}-label`}
                defaultValue={placeholderValue}
                label={label}
                onChange={event => {
                    event.preventDefault();
                    if (onChange) {
                        onChange(event.target.value);
                    }
                }}
                disabled={disabled}
                multiple={multiple}
                notched
                placeholder={_(msg`Select`)}
            >
                {placeholderValue && !showEmptyOption ? (
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
        </FormControl>
    );
};

export default FormSelectUncontrolled;
