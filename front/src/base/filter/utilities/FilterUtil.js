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
};

export default FilterUtil;
