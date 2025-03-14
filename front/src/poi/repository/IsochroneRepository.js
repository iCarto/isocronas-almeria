import {createEntityStore} from "base/entity/repository";
import {createMapboxIsochroneAdapter} from "base/geo/mapbox/repository";

const store = createEntityStore({
    adapter: createMapboxIsochroneAdapter(),
});

const IsochroneRepository = {
    getFeatures(filter = {}) {
        return store.getFeatures(filter);
    },
};

export default IsochroneRepository;
