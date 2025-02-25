const SearchParamsUtil = {
    getURLSearchParams(params) {
        return new URLSearchParams(params);
    },

    getSearchParamsByType(searchParams, defaultParams, type = "filter") {
        const filterKeys = defaultParams
            .filter(param => param.type === type)
            .map(param => param.key);

        const urlFilters = {};
        searchParams.forEach((value, key) => {
            if (filterKeys.includes(key)) urlFilters[key] = value;
        });
        return urlFilters;
    },

    updateParamsFromFilter(searchParams, filter) {
        const params = searchParams;
        Object.entries(filter).forEach(([key, value]) => {
            if (value != null && value !== "") {
                params.set(key, value.toString());
            } else {
                params.delete(key);
            }
        });
        return params;
    },
};

export default SearchParamsUtil;
