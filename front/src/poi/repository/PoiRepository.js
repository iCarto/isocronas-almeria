import {WfsService} from "base/api/service";
import {WfsServiceUtil} from "base/api/utilities";

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
        const params = WfsServiceUtil.buildFeatureParams(filters);
        const data = await WfsService.get(params);

        return {
            type: "FeatureCollection",
            features: data.features,
            totalFeatures: data.totalFeatures,
        };
    },
};

export default PoiRepository;
