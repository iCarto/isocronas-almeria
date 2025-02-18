import {useController, useFormContext} from "react-hook-form";
import {useRulesEngine} from "base/rules/provider";
import {theme} from "Theme";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import {REQUIRED_FIELD} from "../validation";

const FormCheckbox = ({
    name: propsName,
    label = "",
    rules = {},
    disabled = false,
    onChange = null,
    style = {},
    defaultChecked = false,
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

    const handleChange = (userValue, event) => {
        onChange(userValue, event);
    };

    const labelStyle = {
        "& .MuiFormControlLabel-label": {
            fontSize: theme.typography.fontSize,
        },
    };

    return (
        <FormControl
            error={Boolean(error)}
            margin="none"
            sx={label ? {pl: 1, py: "13px"} : {}}
        >
            <FormControlLabel
                label={label || null}
                name={field.name}
                inputRef={field.ref}
                value={field.value}
                sx={!label ? {m: 0, ...labelStyle} : labelStyle}
                control={
                    <Checkbox
                        checked={!!defaultChecked || !!field.value}
                        onChange={event => {
                            const userValue = event.target.checked;
                            field.onChange(userValue); // data sent back to hook form
                            if (onChange) {
                                handleChange(userValue, event);
                            }
                        }}
                        disabled={disabled}
                        sx={style}
                    />
                }
            />
            {error?.message ? <FormHelperText>{error?.message}</FormHelperText> : null}
        </FormControl>
    );
};

export default FormCheckbox;
