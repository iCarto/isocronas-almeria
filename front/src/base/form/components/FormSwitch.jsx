import {useController, useFormContext} from "react-hook-form";

import {REQUIRED_FIELD} from "base/form/validation";
import {useRulesEngine} from "base/rules/provider";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const FormSwitch = ({name: propsName, label, rules = {}, onChangeHandler = null}) => {
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
    } = useController({
        name: propsName,
        control,
        rules: formRules,
    });

    if (isFieldHidden(propsName)) {
        return null;
    }

    const labelStyle = {
        "&.MuiFormControlLabel-root": {
            marginLeft: 0,
            "& .MuiTypography-root": {
                color: "grey.800",
                fontSize: "14px",
                lineHeight: 1.25,
            },
        },
    };

    return (
        <FormControlLabel
            label={label}
            labelPlacement="start"
            id={`${name}-switch-label`}
            sx={labelStyle}
            control={
                <Switch
                    id={`${name}-switch`}
                    checked={value}
                    inputRef={ref}
                    onChange={event => {
                        onChange(event.target.checked);
                        if (onChangeHandler) {
                            onChangeHandler(event.target.checked, propsName);
                        }
                    }}
                />
            }
        />
    );
};

export default FormSwitch;
