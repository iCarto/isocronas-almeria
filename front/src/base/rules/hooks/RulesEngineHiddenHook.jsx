import {useEffect, useState} from "react";
import {RulesUtil} from "../utilities";
import {useFormContext} from "react-hook-form";

export default function useRulesEngineHidden(rules, context = {}) {
    const [hidden, setHidden] = useState([]);
    const {getValues} = useFormContext();

    useEffect(() => {
        const hiddenFields = Object.keys(rules?.fields || {})
            .filter(rule => rules.fields[rule].hidden)
            .map(rule => evaluateRule(rule));
        updateHidden(hiddenFields);
    }, [rules, context]);

    const updateHidden = hiddenFields => {
        setHidden(prevHidden => {
            // Filter out existing entries for the updated fields
            const filteredPrevHidden = prevHidden.filter(
                prevItem => !hiddenFields.some(newItem => prevItem === newItem.rule)
            );

            // Merge with new hidden fields, keeping only those that are hidden
            const mergedArray = [
                ...filteredPrevHidden,
                ...hiddenFields.filter(item => item.hidden).map(item => item.rule),
            ];
            // Only update if the merged array is different from the previous state
            if (JSON.stringify(prevHidden) !== JSON.stringify(mergedArray)) {
                return mergedArray;
            }

            return prevHidden;
        });
    };

    const evaluateRule = ruleField => {
        return {
            rule: ruleField,
            hidden: RulesUtil.evaluateConditions(
                rules.fields[ruleField].hidden.conditions,
                getValues(),
                context
            ),
        };
    };

    const getHiddenRulesForField = updatedField => {
        return Object.keys(rules?.fields || {}).filter(rule => {
            if (rule === updatedField || !rules.fields[rule]["hidden"]) {
                return false;
            }
            // Apply only for rules that contains updated property in condition or formulas
            const formulasToInspect = rules.fields[rule].hidden.conditions.map(
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

    const updateHiddenFields = userUpdatedField => {
        const hiddenFields = getHiddenRulesForField(userUpdatedField).map(rule =>
            evaluateRule(rule)
        );
        updateHidden(hiddenFields);
    };

    return {hidden, updateHiddenFields};
}
