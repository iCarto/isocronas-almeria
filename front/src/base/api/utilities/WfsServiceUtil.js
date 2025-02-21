const pageSize = parseInt(process.env.REACT_APP_PAGE_SIZE);

const WfsServiceUtil = {
    buildListParams(filters = {}, page = 1, sort = "name") {
        const params = {
            sortBy: sort,
            count: pageSize,
            startIndex: (page - 1) * pageSize,
        };

        const cqlFilters = this._buildCqlFilter(filters);
        if (cqlFilters) {
            params.cql_filter = cqlFilters;
        }

        return params;
    },

    buildFeatureParams(filters = {}) {
        const params = {};

        const cqlFilters = this._buildCqlFilter(filters);
        if (cqlFilters) {
            params.cql_filter = cqlFilters;
        }

        return params;
    },

    _buildCqlFilter(filters = {}) {
        const validFilters = Object.entries(filters).filter(
            ([_, value]) => value != null && value !== "undefined"
        );

        if (validFilters.length === 0) {
            return null;
        }

        return validFilters.map(([key, value]) => `${key} = '${value}'`).join(" AND ");
    },
};

export {WfsServiceUtil as default};
