const RulesUtil = {
    evalFunction(evalString, data, context) {
        const contextKeys = Object.keys(context);
        const functionArgs = ["data", ...contextKeys];
        const valueFunction = new Function(...functionArgs, `return ${evalString}`);
        const args = [data, ...contextKeys.map(key => context[key])];
        return valueFunction(...args);
    },

    areNumbersEqual(a, b, epsilon = 0.00001) {
        return Math.abs(a - b) < epsilon;
    },

    areValuesEqual(a, b) {
        if (typeof a === "number" && typeof b === "number") {
            return this.areNumbersEqual(a, b);
        }
        return a === b;
    },

    evaluateConditions(conditions, values, context) {
        if (conditions.length === 0) {
            return true;
        }
        return conditions.every(condition => {
            let fieldValue = values[condition.field];
            if (!values.hasOwnProperty(condition.field)) {
                fieldValue = this.evalFunction(condition.field, values, context);
            }
            switch (condition.operation) {
                case "equals":
                    return fieldValue === condition.value;
                case "not_equals":
                    return fieldValue !== condition.value;
                case "includes":
                    if (Array.isArray(fieldValue)) {
                        return fieldValue.includes(condition.value);
                    }
                case "not_includes":
                    if (Array.isArray(fieldValue)) {
                        return !fieldValue.includes(condition.value);
                    }
                // Add more operations as needed
                default:
                    return false;
            }
        });
    },
};

export default RulesUtil;
