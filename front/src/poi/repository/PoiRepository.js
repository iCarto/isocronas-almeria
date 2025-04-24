import {createEntityStore} from "base/entity/repository";
import {createWfsAuthApiAdapter} from "base/geo/wfs/repository";
import {createPoi} from "poi/model";

const POI_WFS_URL = process.env.REACT_APP_POI_WFS_URL;
const POI_WFS_TYPENAMES = process.env.REACT_APP_POI_WFS_TYPENAMES;

const store = createEntityStore({
    adapter: createWfsAuthApiAdapter({
        url: POI_WFS_URL,
        typeNames: POI_WFS_TYPENAMES,
    }),
});

export const features_to_poi = features => {
    return features
        .map(feature => createPoi({id: feature.id, ...feature.properties}))
        .sort((a, b) => (a.name < b.name ? -1 : 1));
};

const PoiRepository = {
    get(id) {
        return store.getFeatures(id);
    },

    getFeatures(filter = {}) {
        return store.getFeatures(filter);
    },
};

export default PoiRepository;
