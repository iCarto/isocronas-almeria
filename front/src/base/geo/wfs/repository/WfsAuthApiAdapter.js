import {createWfsConfig, createWfsFilter} from "../model";
import {WfsService} from "../service";

const defaultHeaders = {
    Authorization: "Basic " + btoa("admin:geoserver"), // TODO: Move to config file
};

class WfsAuthApiAdapter {
    #typeNames;
    #outputFormat;

    constructor(typeNames, outputFormat) {
        this.#typeNames = typeNames;
        this.#outputFormat = outputFormat;
    }

    getFeature(id) {
        const config = createWfsConfig({
            typeNames: this.#typeNames,
            outputFormat: this.#outputFormat,
            filter: createWfsFilter({featureID: id}),
        });
        return WfsService.get(config.getURL(), defaultHeaders);
    }

    getFeatures(filter) {
        console.log({filter});
        const config = createWfsConfig({
            typeNames: this.#typeNames,
            outputFormat: this.#outputFormat,
            filter: createWfsFilter({category: filter.category}),
        });

        return WfsService.get(config.getURL(), defaultHeaders);
    }
}

const createWfsAuthApiAdapter = ({typeNames, outputFormat}) => {
    return new WfsAuthApiAdapter(typeNames, outputFormat);
};

export default createWfsAuthApiAdapter;
