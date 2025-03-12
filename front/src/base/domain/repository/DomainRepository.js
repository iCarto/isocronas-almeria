import {
    createApiMapper,
    createEntityStore,
    createPublicToolsApiAdapter,
} from "base/entity/repository";
import {createDomainOption} from "../model";

export const domain_entry_to_domain = entries => {
    return Object.entries(entries).reduce((acc, [key, detail]) => {
        acc[key] = detail.map(entry =>
            createDomainOption({
                value: entry.value,
                label: entry.label,
                children: entry.children
                    ? domain_entry_to_domain(entry.children)
                    : null,
            })
        );
        return acc;
    }, {});
};

const store = createEntityStore({
    adapter: createPublicToolsApiAdapter({
        url: "/domains",
        cacheKey: "domains",
    }),
    mapper: createApiMapper({
        toDomain: domain_entry_to_domain,
    }),
});

const DomainRepository = {
    getList(filter, page, sort, order, format = null) {
        return store.getList(filter, page, sort, order, format);
    },
};

export default DomainRepository;
