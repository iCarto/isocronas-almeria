const FormUtil = {
    getFormValue(value, defaultValue = null) {
        // If no defaultValue is present form expects an empty string.
        // False/0/"" are returned as such for the form.
        if (defaultValue == null) {
            // If not defaultValue is present form expects an empty string
            defaultValue = "";
        }
        return value ?? defaultValue;
    },

    getDataValue(value, defaultValue = null) {
        // False/0 are returned as such. Empty strings & undefined are converted to null.
        if (value === "") return defaultValue;
        return value ?? defaultValue;
    },
    getDefaultValues(entityObject, defaultValues = {}) {
        let formDefaultObject = {};
        Object.keys(entityObject).forEach(field => {
            formDefaultObject[field] =
                entityObject[field] || defaultValues[field] || "";
        });
        return formDefaultObject;
    },
    getDataValues(formObject) {
        let formDataObject = {};
        Object.keys(formObject).forEach(field => {
            formDataObject[field] = formObject[field] === "" ? null : formObject[field];
        });
        return formDataObject;
    },
};

export default FormUtil;
