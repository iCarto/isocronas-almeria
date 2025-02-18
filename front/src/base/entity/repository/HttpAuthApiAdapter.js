import {AuthApiService} from "base/api/service";
import {ServiceRequestFormat, ServiceUtil} from "base/api/utilities";

class HttpAuthApiAdapter {
    #url;

    constructor(url) {
        this.#url = url;
    }

    getList(params, format = null) {
        return AuthApiService.get(
            `${this.#url}/?${ServiceUtil.getHttpQueryString(params)}`,
            ServiceUtil.getAcceptHeader(format)
        );
    }

    get(id) {
        return AuthApiService.get(this.#url + "/" + id + "/");
    }

    getBySearchText(searchText) {
        return AuthApiService.get(this.#url + `/?search=` + searchText);
    }

    getNestedEntityList(id, nestedEntityUrl) {
        return AuthApiService.get(this.#url + "/" + id + "/" + nestedEntityUrl + "/");
    }

    create(entity) {
        return AuthApiService.post(this.#url + "/", entity);
    }

    createNestedEntity(parentId, nestedEntity, nestedEntityUrl) {
        return AuthApiService.post(
            this.#url + "/" + parentId + "/" + nestedEntityUrl + "/",
            nestedEntity
        );
    }

    update(entity) {
        return AuthApiService.put(this.#url + "/" + entity.id + "/", entity);
    }

    updateWithPatch(entity) {
        return AuthApiService.patch(this.#url + "/" + entity.id + "/", entity);
    }

    canBeDeleted(id) {
        return AuthApiService.get(this.#url + "/" + id + "/can_be_deleted/");
    }

    delete(id) {
        return AuthApiService.delete(this.#url + "/" + id + "/");
    }

    download(id, path, contentType) {
        return AuthApiService.get(this.#url + "/" + id + "/" + path, {
            "Content-Type": contentType,
        });
    }

    getFeatures(params) {
        return AuthApiService.get(
            `${this.#url}?${ServiceUtil.getHttpQueryString(params)}`,
            ServiceUtil.getAcceptHeader(ServiceRequestFormat.GEOJSON)
        );
    }

    getFeature(id) {
        return AuthApiService.get(
            `${this.#url}/${id}/geom/`,
            ServiceUtil.getAcceptHeader(ServiceRequestFormat.GEOJSON)
        );
    }

    updateFeature(id, feature) {
        return AuthApiService.post(
            `${this.#url}/${id}/geom/`,
            feature,
            ServiceUtil.getAcceptHeader(ServiceRequestFormat.GEOJSON)
        );
    }
}

const createHttpAuthApiAdapter = ({url}) => {
    return new HttpAuthApiAdapter(url);
};

export default createHttpAuthApiAdapter;
