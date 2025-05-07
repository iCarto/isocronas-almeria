import {createWfsConfig, createWfsFilter} from "../model";
import {WfsService} from "../service";

class WfsAuthApiAdapter {
    #config;

    constructor(url, typeNames, outputFormat = "json", headers = {}) {
        this.#config = createWfsConfig({
            url,
            typeNames,
            outputFormat,
            headers,
        });
    }

    getFeature(id) {
        const wfsFilter = createWfsFilter({featureID: id});
        return WfsService.get({
            url: this.#config.getURL(wfsFilter),
            headers: this.#config.headers,
        });
    }

    getFeatures(filter) {
        const wfsFilter = createWfsFilter({category: filter.category});
        return WfsService.get({
            url: this.#config.getURL(wfsFilter),
            headers: this.#config.headers,
        });
    }
}

const createWfsAuthApiAdapter = ({
    url,
    typeNames,
    outputFormat = "json",
    headers = {},
}) => {
    return new WfsAuthApiAdapter(url, typeNames, outputFormat, headers);
};

export default createWfsAuthApiAdapter;
