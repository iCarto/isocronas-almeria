import { useFormContext } from "react-hook-form";
import {Trans} from "@lingui/macro";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormCheckbox from "./FormCheckbox";
import FormGroup from "@mui/material/FormGroup";

const FormCheckboxGroup = ({options = [], containerStyle = {}, required = false}) => {
    const {
        getValues,
        formState: {errors},
    } = useFormContext();

    const validateCheckboxGroup = () => {
        const formValues = getValues();
        const checkBoxesValues = options.map(option => formValues[option.name]);
        const isOneChecked = checkBoxesValues.some(value => value);
        return isOneChecked;
    };

    return (
        <FormControl
            fullWidth
            component="fieldset"
            required={required}
            error={Boolean(errors && errors[options[0]?.name])}
            margin={"dense"}
            sx={{...containerStyle}}
        >
            <FormGroup sx={{flexDirection: "row"}}>
                {options.map(option => (
                    <FormCheckbox
                        key={option.name}
                        label={option.label}
                        name={option.name}
                        rules={{validate: validateCheckboxGroup}}
                        defaultChecked={option.defaultChecked}
                        disabled={option.disabled}
                        style={{paddingY: 0}}
                    />
                ))}
            </FormGroup>
            {errors && errors[options[0]?.name] && (
                <FormHelperText sx={{mb: 2}}>
                    <Trans>Check at least one option</Trans>
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default FormCheckboxGroup;
