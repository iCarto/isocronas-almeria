import {createEntityStore} from "base/entity/repository";
import {createWfsAuthApiAdapter} from "base/geo/wfs/repository";
import {createPoi} from "poi/model";
import createLocalStorageStore from "./LocalStorageStore";

const POI_WFS_URL = process.env.REACT_APP_POI_WFS_URL;
const POI_WFS_TYPENAMES = process.env.REACT_APP_POI_WFS_TYPENAMES;

const wfsStore = createEntityStore({
    adapter: createWfsAuthApiAdapter({
        url: POI_WFS_URL,
        typeNames: POI_WFS_TYPENAMES,
    }),
});

const localStorageStore = createLocalStorageStore({
    keyPrefix: "poi_",
});

export const features_to_poi = features => {
    return features
        .map(feature => createPoi({id: feature.id, ...feature.properties}))
        .sort((a, b) => (a.name < b.name ? -1 : 1));
};

const PoiRepository = {
    get(id) {
        return wfsStore.getFeatures(id);
    },

    getFeatures() {
        const cacheKey = localStorageStore.generateKey("features");
        const cachedData = localStorageStore.getWithCache(cacheKey);

        if (cachedData !== null) {
            return Promise.resolve(cachedData);
        }

        // If no valid cache, fetch fresh data
        return wfsStore.getFeatures().then(features => {
            // Update cache with the new data
            localStorageStore.setCache(cacheKey, features);
            return features;
        });
    },
};

export default PoiRepository;
