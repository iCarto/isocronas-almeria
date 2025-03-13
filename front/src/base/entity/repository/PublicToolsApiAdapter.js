import {Storage} from "base/storage";
import JsonFileService from "base/file/service/JsonFileService";

const jsonBasePath = "/tools";

class PublicToolsApiAdapter {
    #url;
    #cacheKey;

    constructor(url, cacheKey) {
        this.#url = url;
        this.#cacheKey = cacheKey;
    }

    getList(params, format = null) {
        const storedDomains = Storage.get(this.#cacheKey);
        if (storedDomains) {
            return Promise.resolve(JSON.parse(storedDomains));
        }

        return JsonFileService.get(this.#url, jsonBasePath).then(response => {
            Storage.set(this.#cacheKey, JSON.stringify(response));
            return response;
        });
    }
}

const createPublicToolsApiAdapter = ({url, cacheKey}) => {
    return new PublicToolsApiAdapter(url, cacheKey);
};

export default createPublicToolsApiAdapter;
