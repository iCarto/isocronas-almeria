import {createEntityStore, createPublicToolsApiAdapter} from "base/entity/repository";

const store = createEntityStore({
    adapter: createPublicToolsApiAdapter({
        url: "/bboxes",
        cacheKey: "municipalities",
    }),
});

const MunicipalityRepository = {
    getList(filter, page, sort, order, format = null) {
        return store.getList(filter, page, sort, order, format);
    },
};

export default MunicipalityRepository;
