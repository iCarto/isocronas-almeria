import {ErrorUtil} from "base/error/utilities";

const WfsService = {
    baseUrl: "/geoserver/wfs",
    typeName: "isocronas:poi",
    defaultParams: {
        service: "WFS",
        version: "2.0.0",
        request: "GetFeature",
        typeNames: "isocronas:poi",
        outputFormat: "json",
    },

    async get(extraParams = {}) {
        const params = new URLSearchParams({
            ...this.defaultParams,
            ...extraParams,
        });
        const url = `${this.baseUrl}?${params.toString()}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: "Basic " + btoa("admin:geoserver"),
                },
            });

            if (!response.ok) {
                ErrorUtil.throwFetchError(response);
            }
            return await response.json();
        } catch (error) {
            ErrorUtil.throwFetchError(error);
        }
    },
};

export default WfsService;
