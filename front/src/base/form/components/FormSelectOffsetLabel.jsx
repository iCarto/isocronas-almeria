import {useController, useFormContext} from "react-hook-form";
import {useRulesEngine} from "base/rules/provider";
import {FormInputLabelOffset} from ".";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import {REQUIRED_FIELD} from "../validation";

const FormSelectOffsetLabel = ({
    name: propsName,
    label,
    tooltipText = "",
    options,
    rules = {},
    onChangeHandler = null,
    showEmptyOption = true,
    disabled = false,
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
        field: {onChange, name, value, ref},
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules: formRules,
    });

    if (isFieldHidden(propsName)) {
        return null;
    }

    const emptyOption = {
        value: "",
        label: "‌‌", // This is not an empty character. It's U+200C unicode character.
    };

    return (
        <>
            <FormInputLabelOffset name={name} label={label} tooltipText={tooltipText} />
            <FormControl fullWidth sx={{mt: 0, mb: 1}} error={Boolean(error)}>
                <Select
                    labelId={`${name}-label`}
                    name={name}
                    inputRef={ref}
                    value={value}
                    onChange={event => {
                        event.preventDefault();
                        onChange(event);
                        if (onChangeHandler) {
                            onChangeHandler(event.target.value, propsName);
                        }
                    }}
                    disabled={disabled}
                >
                    {options &&
                        (showEmptyOption ? [emptyOption, ...options] : options).map(
                            ({label, value}) => (
                                <MenuItem key={value} value={value}>
                                    {label}
                                </MenuItem>
                            )
                        )}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        </>
    );
};

export default FormSelectOffsetLabel;
