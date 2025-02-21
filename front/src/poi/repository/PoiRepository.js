import {WfsService} from "base/api/service";

const PoiRepository = {
    getList: async (filters = {}, page = 1, sort = "name") => {
        const params = {
            sortBy: sort,
            // count,
            // startIndex
        };

        if (filters.category) {
            params.cql_filter = `category = '${filters.category}'`;
        }

        const data = await WfsService.get(params);
        return {
            results: data.features,
            count: data.totalFeatures,
        };
    },

    get: async id => {
        const params = {id: id};

        const data = await WfsService.get(params);
        return data.features && data.features.length ? data.features[0] : null;
    },

    // getByCategory: async category => {
    //     const response = await fetch(
    //         buildUrl({
    //             sortBy: "name",
    //             cql_Filter: `category = '${category}'`,
    //         })
    //     );
    //     return response.json();
    // },
};

export default PoiRepository;
