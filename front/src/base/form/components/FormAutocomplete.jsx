import {useController, useFormContext} from "react-hook-form";
import {Trans, msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";
import {useRulesEngine} from "base/rules/provider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {REQUIRED_FIELD} from "../validation";

const FormAutocomplete = ({
    name: propsName,
    label,
    options,
    optionIdAttribute = "id",
    optionLabelAttribute = "name",
    rules = {},
    onChangeHandler = null,
}) => {
    const {_} = useLingui();
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
        field: {onChange, value, ref},
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules: formRules,
    });

    if (isFieldHidden(propsName)) {
        return null;
    }

    return (
        <Autocomplete
            fullWidth
            id={`${propsName}-form-autocomplete`}
            noOptionsText={<Trans>No options available</Trans>}
            onChange={(event, option) => {
                onChange(option);
                event.preventDefault();
                if (onChangeHandler) {
                    onChangeHandler(option);
                }
            }}
            value={value}
            options={options}
            getOptionLabel={option =>
                option && option[optionLabelAttribute]
                    ? option[optionLabelAttribute]
                    : ""
            }
            isOptionEqualToValue={(option, value) =>
                value &&
                value !== "" &&
                option[optionIdAttribute] === value[optionIdAttribute]
            }
            renderOption={(props, option, {selected}) => (
                <Box component="li" {...props} key={option[optionIdAttribute]}>
                    <Stack>
                        <Typography>{option[optionLabelAttribute]}</Typography>
                    </Stack>
                </Box>
            )}
            renderInput={params => (
                <TextField
                    {...params}
                    inputRef={ref}
                    label={label}
                    placeholder={_(msg`Select an option`)}
                    error={Boolean(error)}
                    helperText={error?.message}
                    InputLabelProps={{shrink: true}}
                />
            )}
        />
    );
};

export default FormAutocomplete;
