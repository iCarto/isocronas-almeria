import {useController, useFormContext} from "react-hook-form";
import {useRulesEngine} from "base/rules/provider";
import {FormInputLabel} from ".";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import {REQUIRED_FIELD} from "../validation";

const FormSelectMultiple = ({
    name: propsName,
    label,
    options,
    rules = {},
    onChangeHandler = null,
    tooltipText = "",
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

    const inputLabel = formRules && formRules["required"] ? `${label} * ` : label;

    // TO-DO: Find a better way to do this: now we are adding a string ("extra") to increase the space that the hidden label is taking so that there is enough space for the info icon.
    const hiddenLabel = tooltipText ? label + "extra" : inputLabel;

    const getOptionLabels = optionValues => {
        if (optionValues) {
            return optionValues
                .map(optionValue => {
                    const optionFound = options.find(
                        option => option.value === optionValue
                    );
                    if (optionFound) {
                        return optionFound.label;
                    }
                    return null;
                })
                .join(", ");
        }
        return "";
    };

    return (
        <FormControl fullWidth error={Boolean(error)} margin="dense">
            <FormInputLabel
                name={field.name}
                label={inputLabel}
                tooltipText={tooltipText}
            />
            <Select
                labelId={`${field.name}-label`}
                name={field.name}
                inputRef={field.ref}
                value={field.value}
                onChange={event => {
                    event.preventDefault();
                    field.onChange(event.target.value);
                    if (onChangeHandler) {
                        onChangeHandler(event.target.value, propsName);
                    }
                    trigger(propsName);
                }}
                multiple
                input={
                    <OutlinedInput
                        label={hiddenLabel}
                        onBlur={() => {
                            trigger(propsName);
                        }}
                    />
                }
                renderValue={selected => getOptionLabels(selected)}
                disabled={disabled}
                notched
            >
                {options?.map(({label: optionLabel, value: optionValue, disabled}) => (
                    <MenuItem key={optionValue} value={optionValue} disabled={disabled}>
                        <Checkbox checked={field.value.indexOf(optionValue) > -1} />
                        <ListItemText primary={optionLabel} />
                    </MenuItem>
                ))}
            </Select>
            {error?.message ? <FormHelperText>{error?.message}</FormHelperText> : null}
        </FormControl>
    );
};

export default FormSelectMultiple;
