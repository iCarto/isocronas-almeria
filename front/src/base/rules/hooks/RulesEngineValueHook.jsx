import {RulesUtil} from "../utilities";
import {useFormContext} from "react-hook-form";

export default function useRulesEngineValue(rules, context = {}) {
    const {getValues, setValue} = useFormContext();

    const getValueRulesForField = updatedField => {
        return Object.keys(rules?.fields || {}).filter(rule => {
            if (rule === updatedField || !rules.fields[rule]["value"]) {
                return false;
            }
            // Apply only for rules that contains updated property in condition or formulas
            const formulasToInspect = rules.fields[rule]["value"]
                .map(valueRule => [
                    valueRule["setValue"],
                    ...valueRule.conditions.map(condition => condition.field),
                ])
                .flat();
            const formulaFields = [...new Set(formulasToInspect)];
            // TODO(egago): Improve the way to find changes
            return formulaFields.some(
                field =>
                    field === updatedField ||
                    field.split(".").includes(updatedField) ||
                    field.split("'").includes(updatedField)
            );
        });
    };

    const applyValueRule = fieldName => {
        rules.fields[fieldName].value.forEach(ruleValue => {
            if (
                RulesUtil.evaluateConditions(ruleValue.conditions, getValues(), context)
            ) {
                const formData = getValues();
                const oldValue = formData[fieldName];
                const newValue = calculateValue(formData, ruleValue.setValue);
                if (!RulesUtil.areValuesEqual(oldValue, newValue)) {
                    console.log("RULES ENGINE: Setting value", {fieldName}, newValue);
                    setValue(fieldName, newValue);
                }
            }
        });
    };

    const calculateValue = (entity, valueConfig) => {
        if (valueConfig === "") return valueConfig;
        return RulesUtil.evalFunction(valueConfig, entity, context);
    };

    const updateFieldsValue = userUpdatedField => {
        getValueRulesForField(userUpdatedField).forEach(rule => {
            applyValueRule(rule);
        });
    };

    return {updateFieldsValue};
}
