import {useController, useFormContext} from "react-hook-form";
import {Trans} from "@lingui/macro";

import {useRulesEngine} from "base/rules/provider";
import {useDateUtil} from "base/i18n/utils";

import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import {REQUIRED_FIELD} from "../validation";

const FormDatePicker = ({
    name: propsName,
    label,
    rules = {},
    onChangeHandler = null,
    disabled = false,
    disableFuture = true,
    views = ["year", "month", "day"],
    minDate = new Date(1990, 0, 1),
    maxDate = new Date(2099, 11, 31),
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
    const {parseDate, isInvalidDateObject, formatDate, formatDateForAPI} =
        useDateUtil();

    const {
        field: {onChange, name, value, ref},
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules: {
            ...formRules,
            validate: {
                checkDate: value => {
                    if (value) return validateDate(value);
                },
            },
        },
    });

    if (isFieldHidden(propsName)) {
        return null;
    }

    const inputLabel = formRules && formRules["required"] ? `${label} *` : label;

    const validateDate = value => {
        const dateObject = parseDate(value);
        if (isInvalidDateObject(dateObject)) {
            return <Trans>Invalid date</Trans>;
        }

        if (!isInvalidDateObject(dateObject)) {
            const year = dateObject.getFullYear();
            if (year < minDate.getFullYear() || year > maxDate.getFullYear()) {
                return (
                    <Trans>
                        The date must be between {formatDate(minDate)} and
                        {formatDate(maxDate)}.
                    </Trans>
                );
            }
        }

        return true;
    };

    const handleChange = value => {
        const formattedDate = formatDateForAPI(value);
        onChange(formattedDate); // data sent back to hook form
        if (onChangeHandler) {
            onChangeHandler(formattedDate, propsName);
        }
        trigger(propsName);
    };

    return (
        <FormControl fullWidth error={Boolean(error)} margin="dense">
            <DatePicker
                name={name}
                value={parseDate(value)}
                label={inputLabel}
                inputRef={ref}
                onChange={value => {
                    handleChange(value);
                }}
                slotProps={{
                    textField: {
                        variant: "outlined",
                        InputLabelProps: {shrink: true},
                        helperText: error?.message,
                        error: Boolean(error),
                    },
                }}
                views={views}
                minDate={minDate}
                maxDate={maxDate}
                disableFuture={disableFuture}
                disabled={disabled}
            />
        </FormControl>
    );
};

export default FormDatePicker;
