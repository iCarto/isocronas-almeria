import {useFieldArray, useFormContext} from "react-hook-form";
import {useLingui} from "@lingui/react";
import {msg} from "@lingui/macro";

import {useRulesEngine} from "base/rules/provider";
import {AddNewFullWidthButton} from "base/shared/components";
import {FormTextArea} from "base/form/components";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {REQUIRED_FIELD} from "../validation";

const FormTextAreaList = ({name: propsName, itemName, rules = {}}) => {
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
    const {fields, append, remove} = useFieldArray({
        control,
        name: propsName,
        rules: formRules,
    });

    if (isFieldHidden(propsName)) {
        return null;
    }

    const moreThanOneField = fields.length > 1;

    const handleClickAppend = () => {
        append("");
    };

    return (
        <Grid container spacing={1} mt={1}>
            {!fields.length ? (
                <Grid item container alignItems="center" xs={12}>
                    <Grid item xs={12}>
                        <FormTextArea
                            name={`${propsName}.0`}
                            label={`${itemName} 1`}
                            rows={3}
                        />
                    </Grid>
                </Grid>
            ) : null}
            {fields.map((field, index) => (
                <Grid item container alignItems="center" xs={12} key={field.id}>
                    <Grid item xs={moreThanOneField ? 11 : 12}>
                        <FormTextArea
                            name={`${propsName}.${index}`}
                            label={`${itemName} ${index + 1}`}
                            rows={3}
                        />
                    </Grid>
                    {moreThanOneField && (
                        <Grid item container justifyContent="center" xs={1}>
                            <IconButton
                                aria-label="delete"
                                onClick={() => remove(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    )}
                </Grid>
            ))}
            <Grid item xs={12}>
                <AddNewFullWidthButton
                    onClick={handleClickAppend}
                    tooltip={_(msg`Add ${itemName.toLowerCase()}`)}
                />
            </Grid>
        </Grid>
    );
};

export default FormTextAreaList;
