import {useController, useFormContext} from "react-hook-form";
import {useRulesEngine} from "base/rules/provider";
import {theme} from "Theme";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {REQUIRED_FIELD} from "../validation";

const FormInputText = ({
    name: propsName,
    label = "",
    placeholder = null,
    endAdornment = null,
    tooltipText = "",
    maxLength = 150,
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

    let inputProps = {};
    if (endAdornment) {
        inputProps = {
            ...inputProps,
            endAdornment: endAdornment && (
                <InputAdornment
                    position="end"
                    disableTypography
                    sx={{fontSize: theme.typography.fontSize}}
                >
                    {endAdornment}
                </InputAdornment>
            ),
        };
    }

    const getLabel = () => {
        return tooltipText ? (
            <Box display="flex" alignItems="center" marginRight="-8px">
                {inputLabel}
                {
                    <Tooltip title={tooltipText} arrow enterDelay={500}>
                        <InfoOutlinedIcon
                            fontSize="small"
                            sx={{mx: 1, color: "grey.500"}}
                        />
                    </Tooltip>
                }
            </Box>
        ) : (
            inputLabel
        );
    };

    return (
        <FormControl fullWidth error={Boolean(error)} margin={"dense"}>
            <TextField
                name={name}
                value={value}
                onChange={event => {
                    onChange(event);
                    if (error) trigger(propsName);
                }}
                onBlur={() => {
                    onBlur();
                    trigger(propsName);
                }}
                inputRef={ref}
                label={getLabel()}
                placeholder={placeholder}
                inputProps={{maxLength: maxLength}}
                InputProps={inputProps}
                InputLabelProps={{shrink: true}}
                disabled={disabled}
                error={Boolean(error)}
                helperText={error?.message}
            />
        </FormControl>
    );
};

export default FormInputText;
