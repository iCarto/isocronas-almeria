import {useEffect, useState} from "react";
import {RulesUtil} from "../utilities";
import {useFormContext} from "react-hook-form";

export default function useRulesEngineRequired(rules, context = {}) {
    const [required, setRequired] = useState([]);
    const {getValues} = useFormContext();

    useEffect(() => {
        const requiredFields = Object.keys(rules?.fields || {})
            .filter(rule => rules.fields[rule].required)
            .map(rule => evaluateRule(rule));
        updateRequired(requiredFields);
    }, [rules, context]);

    const updateRequired = requiredFields => {
        setRequired(prevRequired => {
            // Filter out existing entries for the updated fields
            const filteredPrevRequired = prevRequired.filter(
                prevItem => !requiredFields.some(newItem => prevItem === newItem.rule)
            );

            // Merge with new required fields, keeping only those that are required
            const mergedArray = [
                ...filteredPrevRequired,
                ...requiredFields.filter(item => item.required).map(item => item.rule),
            ];
            // Only update if the merged array is different from the previous state
            if (JSON.stringify(prevRequired) !== JSON.stringify(mergedArray)) {
                return mergedArray;
            }

            return prevRequired;
        });
    };

    const evaluateRule = ruleField => {
        return {
            rule: ruleField,
            required: RulesUtil.evaluateConditions(
                rules.fields[ruleField].required.conditions,
                getValues(),
                context
            ),
        };
    };

    const getRequiredRulesForField = updatedField => {
        return Object.keys(rules?.fields || {}).filter(rule => {
            if (rule === updatedField || !rules.fields[rule]["required"]) {
                return false;
            }
            // Apply only for rules that contains updated property in condition or formulas
            const formulasToInspect = rules.fields[rule].required.conditions.map(
                condition => condition.field
            );
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

    const updateRequiredFields = userUpdatedField => {
        const requiredFields = getRequiredRulesForField(userUpdatedField).map(rule =>
            evaluateRule(rule)
        );
        updateRequired(requiredFields);
    };

    return {required, updateRequiredFields};
}
