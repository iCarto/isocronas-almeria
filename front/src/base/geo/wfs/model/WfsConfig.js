const defaultParams = {
    service: "WFS",
    version: "2.0.0",
    request: "GetFeature",
    outputFormat: "json",
};

class WfsConfig {
    #typeNames;
    #outputFormat;
    #filter;

    get typeNames() {
        return this.#typeNames;
    }

    get outputFormat() {
        return this.#outputFormat;
    }

    get filter() {
        return this.#filter;
    }

    constructor(typeNames, outputFormat, filter) {
        this.#typeNames = typeNames;
        this.#outputFormat = outputFormat;
        this.#filter = filter;
    }

    getURL() {
        const params = new URLSearchParams({
            ...defaultParams,
            typeNames: this.typeNames,
            outputFormat: this.outputFormat,
        });
        const filterParams = this.filter.getCqlFilter();
        if (filterParams) {
            params.append("cql_filter", filterParams);
        }

        return `${params.toString()}`;
    }
}

const createWfsConfig = ({typeNames, outputFormat, filter}) => {
    return new WfsConfig(typeNames, outputFormat, filter);
};

export default createWfsConfig;
