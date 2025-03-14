import {createEntityStore} from "base/entity/repository";
import {createWfsAuthApiAdapter} from "base/geo/wfs/repository";

const store = createEntityStore({
    adapter: createWfsAuthApiAdapter({
        typeNames: "isocronas:poi",
        outputFormat: "json",
    }),
});

const PoiRepository = {
    get(id) {
        return store.getFeatures(id);
    },

    getFeatures(filter = {}) {
        return store.getFeatures(filter);
    },
};

export default PoiRepository;
