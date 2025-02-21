import {ErrorUtil} from "base/error/utilities";

const WfsService = {
    baseUrl: "/geoserver/wfs",
    defaultParams: {
        service: "WFS",
        version: "2.0.0",
        request: "GetFeature",
        typeNames: "isocronas:poi",
        outputFormat: "json",
    },
    cache: {
        data: null,
        timestamp: null,
        expirationMinutes: 5,
    },

    get(extraParams = {}) {
        const params = new URLSearchParams({
            ...this.defaultParams,
            ...extraParams,
        });
        const url = `${this.baseUrl}?${params.toString()}`;

        return fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Basic " + btoa("admin:geoserver"),
            },
        })
            .then(ErrorUtil.handleFetchResponse)
            .then(data => {
                return data;
            })
            .catch(error => {
                ErrorUtil.handleError(error);
            });
    },
};

export default WfsService;
