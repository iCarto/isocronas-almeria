const SearchParamsUtil = {
    getURLSearchParams(params) {
        return new URLSearchParams(params);
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
