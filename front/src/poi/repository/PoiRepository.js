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

    // Hacemos una primera llamada al servicio para almacenar en local storage los datos sin filtrar, y luego todos el filtrado lo hacemos siempre en el cliente.
    getFeatures: async (filters = {}) => {
        const storedData = Storage.get(storageKey);
        let data;

        if (storedData) {
            data = JSON.parse(storedData).data;
        }

        if (!data) {
            data = await WfsService.get({});
            Storage.set(storageKey, JSON.stringify({data}));
        }

        const features = data?.features || [];
        const filteredFeatures = filterFeatures(features, filters);

        return {
            type: "FeatureCollection",
            features: filteredFeatures,
            totalFeatures: filteredFeatures.length,
        };
    },
};

export default PoiRepository;

const filterFeatures = (data, filters) => {
    if (!filters || Object.keys(filters).length === 0) return data;

    return data.filter(feature => {
        return Object.entries(filters).every(([key, value]) => {
            let filterValues;
            if (Array.isArray(value)) {
                filterValues = value;
            } else if (typeof value === "string" && value.includes(",")) {
                filterValues = value.split(",").map(v => v.trim());
            } else {
                filterValues = [value];
            }
            return filterValues.some(
                filterValue => feature.properties[key] === filterValue
            );
        });
    });
};
