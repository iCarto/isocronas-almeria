import {createEntityStore} from "base/entity/repository";
import {createMapboxIsochroneAdapter} from "base/geo/mapbox/repository";
import createLocalStorageStore from "./LocalStorageStore";

const store = createEntityStore({
    adapter: createMapboxIsochroneAdapter(),
});

const localStorageStore = createLocalStorageStore({
    keyPrefix: "isochrone_",
});

const round = (value, step = 0.0005) => {
    if (!value) {
        return value;
    }
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
};

const IsochroneRepository = {
    getFeatures(filter = {}) {
        let coordinates = filter?.selected_point?.split(",");
        coordinates = {
            lng: round(coordinates[1]),
            lat: round(coordinates[0]),
        };

        const processedFilter = {
            selected_point: `${coordinates.lat},${coordinates.lng}`,
            transport: filter.transport,
            time: filter.travel_time,
        };
        const cacheKey = localStorageStore.generateKey("features", processedFilter);

        const cachedData = localStorageStore.getWithCache(cacheKey);

        if (cachedData !== null) {
            return Promise.resolve(cachedData);
        }

        // If no valid cache, fetch fresh data
        return store.getFeatures(filter).then(features => {
            // Update cache with the new data
            localStorageStore.setCache(cacheKey, features);
            return features;
        });
    },
};

export default IsochroneRepository;
