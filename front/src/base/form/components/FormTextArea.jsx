import {useController, useFormContext} from "react-hook-form";
import {useRulesEngine} from "base/rules/provider";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import {REQUIRED_FIELD} from "../validation";

const FormTextArea = ({
    name: propsName,
    label,
    placeholder = "",
    maxLength = 4000,
    rows = 3,
    rules = {},
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
        field: {onChange, onBlur, name, value, ref},
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules: formRules,
    });

    if (isFieldHidden(propsName)) {
        return null;
    }

    const inputLabel = formRules && formRules["required"] ? `${label} *` : label;

    return (
        <FormControl fullWidth error={Boolean(error)} margin="dense">
            <TextField
                name={name}
                value={value}
                label={inputLabel}
                placeholder={placeholder}
                inputRef={ref}
                onChange={event => {
                    onChange(event);
                    if (error) trigger(propsName);
                }}
                onBlur={() => {
                    onBlur();
                    trigger(propsName);
                }}
                error={Boolean(error)}
                helperText={error?.message}
                inputProps={{maxLength: maxLength, style: {padding: 0}}}
                InputLabelProps={{shrink: true}}
                multiline
                rows={rows}
                disabled={disabled}
                sx={{
                    "& .MuiInputBase-multiline": {
                        padding: "14px",
                    },
                }}
            />
        </FormControl>
    );
};

export default FormTextArea;
