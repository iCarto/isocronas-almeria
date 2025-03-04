const FilterUtil = {
    cleanFilter(filter) {
        return Object.fromEntries(
            Object.entries(filter).filter(
                ([_, v]) => v != null && typeof v !== "undefined" && v !== ""
            )
        );
    },

    equalsFilter(filter1, filter2) {
        return JSON.stringify(filter1) === JSON.stringify(filter2);
    },

    getScopedFilters(filters, config, scope) {
        return Object.keys(filters)
            .filter(key =>
                config.params.some(
                    param => param.key === key && param.scope.includes(scope)
                )
            )
            .reduce((acc, key) => ({...acc, [key]: filters[key]}), {});
    },
};

export default FilterUtil;
