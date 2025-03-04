import {WfsService} from "base/api/service";
import {WfsServiceUtil} from "base/api/utilities";
import {Storage} from "base/storage";

const storageKey = "poi_features";

const PoiRepository = {
    getList: async (filters = {}, page = 1, sort = "name") => {
        const params = WfsServiceUtil.buildListParams(filters, page, sort);
        const data = await WfsService.get(params);

        return {
            results: data.features,
            count: data.totalFeatures,
        };
    },

    get: async id => {
        const params = {featureID: id};
        const data = await WfsService.get(params);
        return data.features && data.features.length ? data.features[0] : null;
    },

    getFeatures: async (filters = {}) => {
        const storedData = Storage.get(storageKey);
        let data, storedFilters;

        if (storedData) {
            const parsed = JSON.parse(storedData);
            data = parsed.data;
            storedFilters = parsed.filters;
        }

        if (!data || JSON.stringify(filters) !== JSON.stringify(storedFilters)) {
            const params = WfsServiceUtil.buildFeatureParams(filters);
            data = await WfsService.get(params);
            Storage.set(storageKey, JSON.stringify({data, filters}));
        }

        const features = data?.features || [];
        const filteredFeatures = applyFilters(features, filters);

        return {
            type: "FeatureCollection",
            features: filteredFeatures,
            totalFeatures: filteredFeatures.length,
        };
    },
};

export default PoiRepository;

// Move this
const applyFilters = (data, filters) => {
    if (!filters || Object.keys(filters).length === 0) return data;

    const filteredFeatures = data.filter(feature => {
        return Object.entries(filters).every(([key, value]) => {
            return feature.properties[key] === value;
        });
    });

    return filteredFeatures;
};
