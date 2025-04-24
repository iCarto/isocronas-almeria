const defaultParams = {
    service: "WFS",
    version: "2.0.0",
    request: "GetFeature",
    outputFormat: "json",
};

const defaultHeaders = {};

const isObjectEmptyOrNullOrUndefined = objectName => {
    if (objectName === null || objectName === undefined) {
        return true;
    }
    if (Object.keys(objectName).length === 0) {
        // empty object
        return true;
    }
    return false;
};

class WfsConfig {
    url;
    typeNames;
    outputFormat;
    headers;

    constructor(url, typeNames, outputFormat, headers) {
        this.url = url;
        this.typeNames = typeNames;
        this.outputFormat = outputFormat;
        this.headers = {...defaultHeaders, ...headers};
    }

    getURL(filter = null) {
        const params = new URLSearchParams({
            ...defaultParams,
            typeNames: this.typeNames,
            outputFormat: this.outputFormat,
        });
        if (isObjectEmptyOrNullOrUndefined(filter)) {
            const filterParams = filter.getCqlFilter();
            if (filterParams) {
                params.append("cql_filter", filterParams);
            }
        }

        return `${this.url}?${params.toString()}`;
    }
}

const createWfsConfig = ({url, typeNames, outputFormat, headers}) => {
    return new WfsConfig(url, typeNames, outputFormat, headers);
};

export default createWfsConfig;
