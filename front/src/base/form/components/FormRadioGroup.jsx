import {useController, useFormContext} from "react-hook-form";
import {useRulesEngine} from "base/rules/provider";
import {theme} from "Theme";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {REQUIRED_FIELD} from "../validation";

const FormRadioGroup = ({
    name: propsName,
    label = "",
    tooltipText = "",
    options = [],
    rules = {},
    containerStyle = {},
    labelStyle = {},
    row = false,
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

    const inputLabel = formRules && formRules["required"] ? `${label} *` : label;

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
        <FormControl
            fullWidth
            error={Boolean(error)}
            margin={"dense"}
            sx={containerStyle}
        >
            {label ? (
                <FormLabel id={`radio-buttons-group-${label}`} sx={labelStyle}>
                    {getLabel()}
                </FormLabel>
            ) : null}
            <RadioGroup
                aria-labelledby={`radio-buttons-group-${label}`}
                name={name}
                value={value}
                onChange={event => {
                    onChange(event);
                    if (error) trigger(propsName);
                }}
                row={row}
            >
                {options?.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        value={option.value}
                        control={<Radio size="small" />}
                        label={option.label}
                        disabled={disabled}
                        sx={{fontSize: theme.typography.fontSize}}
                    />
                ))}
            </RadioGroup>
            {error?.message ? <FormHelperText>{error?.message}</FormHelperText> : null}
        </FormControl>
    );
};

export default FormRadioGroup;
