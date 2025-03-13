import {ServiceRequestFormat, ServiceUtil} from "base/api/utilities";

class EntityStore {
    #adapter;
    #mapper;

    constructor(adapter, mapper) {
        this.#adapter = adapter;
        this.#mapper = mapper;
    }

    get adapter() {
        return this.#adapter;
    }

    get mapper() {
        return this.#mapper;
    }

    getMappedToDomain(data) {
        if (this.mapper) {
            return this.mapper.mapToDomain(data);
        }
        return data;
    }

    getMappedToPersistence(data) {
        if (this.mapper) {
            return this.mapper.mapToPersistence(data);
        }
        return data;
    }

    getList(filter, page, sort, order, format = null) {
        return this.adapter
            .getList(ServiceUtil.adaptRequestParams(filter, page, sort, order), format)
            .then(response => {
                // TODO(egago): Move download data (excel, csv,...) to a new repository method downloadList()
                if (format && ![ServiceRequestFormat.JSON].includes(format)) {
                    return response;
                }
                return this.getMappedToDomain(response);
            });
    }

    get(id) {
        return this.adapter.get(id).then(object => {
            return this.getMappedToDomain(object);
        });
    }

    getBySearchText(searchText) {
        return this.adapter.getBySearchText(searchText).then(response => {
            if (response.results) {
                response.results = this.getMappedToDomain(response.results);
                return response;
            }
            return this.getMappedToDomain(response);
        });
    }

    getNestedEntityList(id, nestedEntityUrl, nestedEntityMapper) {
        return this.adapter.getNestedEntityList(id, nestedEntityUrl).then(response => {
            return response.map(nestedEntityMapper);
        });
    }

    getCustomAction(id, customUrl) {
        return this.adapter.getNestedEntityList(id, customUrl).then(response => {
            return response;
        });
    }

    create(object) {
        return this.adapter
            .create(this.getMappedToPersistence(object))
            .then(createdObject => {
                return this.getMappedToDomain(createdObject);
            });
    }

    createNestedEntity(parentId, object, nestedEntityUrl, toPersistance, toDomain) {
        return this.adapter
            .createNestedEntity(parentId, toPersistance(object), nestedEntityUrl)
            .then(createdObject => {
                return toDomain(createdObject);
            });
    }

    update(object) {
        return this.adapter
            .update(this.getMappedToPersistence(object))
            .then(updatedObject => {
                return this.getMappedToDomain(updatedObject);
            });
    }

    delete(id) {
        return this.adapter.delete(id);
    }

    getFeature(id) {
        return this.adapter.getFeature(id);
    }

    getFeatures(filter) {
        return this.adapter.getFeatures(ServiceUtil.adaptFilterParams(filter));
    }

    updateFeature(id, feature) {
        return this.adapter.updateFeature(id, feature);
    }

    download(id, path, contentType) {
        return this.adapter.download(id, path, contentType);
    }
}

const createEntityStore = ({adapter, mapper = null}) => {
    // Based on https://www.js-data.io/docs/connecting-to-a-data-source
    return new EntityStore(adapter, mapper);
};

export default createEntityStore;
