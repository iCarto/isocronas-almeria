const ServiceResponseContentType = Object.freeze({
    GEOJSON: "application/geo+json",
    CSV: "text/csv",
    SHP: "aplication/x-shapefile",
    PNG: "image/png",
    JPG: "image/jpg",
    PDF: "application/pdf",
    JSON: "application/json",
    EXCEL: "application/vnd.ms-excel",
});

const ServiceRequestFormat = Object.freeze({
    GEOJSON: "geojson",
    CSV: "csv",
    SHP: "shp",
    PNG: "png",
    JPG: "jpg",
    PDF: "pdf",
    JSON: "json",
    EXCEL: "excel",
});

const ServiceUtil = {
    adaptPageParams(page) {
        return page != null ? {page} : {};
    },

    adaptFilterParams(filter) {
        if (!filter) {
            return {};
        }
        let filterParams = {};
        Object.keys(filter)
            .filter(key => filter[key] != null && filter[key] !== "undefined")
            .forEach(key => {
                filterParams[key] = filter[key];
            });
        return filterParams;
    },

    adaptOrderParams(sort, order) {
        if (!sort || !order) {
            return {};
        }
        return {ordering: `${order === "desc" ? "-" : ""}${sort}`};
    },

    adaptRequestParams(filter, page, sort, order) {
        const requestParams = {
            ...this.adaptFilterParams(filter),
            ...this.adaptPageParams(page),
            ...this.adaptOrderParams(sort, order),
        };
        return requestParams;
    },

    getHttpQueryString(params) {
        if (!params) {
            return "";
        }
        return Object.keys(params)
            .filter(key => params[key] != null && params[key] !== "undefined")
            .map(key => {
                return key + "=" + params[key];
            })
            .join("&");
    },

    getAcceptHeader(requestFormat) {
        switch (requestFormat) {
            case ServiceRequestFormat.GEOJSON:
                return {
                    Accept: ServiceResponseContentType.GEOJSON,
                };
            case ServiceRequestFormat.CSV:
                return {
                    Accept: ServiceResponseContentType.CSV,
                };
            case ServiceRequestFormat.SHP:
                return {
                    Accept: ServiceResponseContentType.SHP,
                };
            case ServiceRequestFormat.PNG:
                return {
                    Accept: ServiceResponseContentType.PNG,
                };
            case ServiceRequestFormat.JPG:
                return {
                    Accept: ServiceResponseContentType.JPG,
                };
            case ServiceRequestFormat.PDF:
                return {
                    Accept: ServiceResponseContentType.PDF,
                };
            case ServiceRequestFormat.EXCEL:
                return {
                    Accept: ServiceResponseContentType.EXCEL,
                };
            default:
                return {
                    Accept: ServiceResponseContentType.JSON,
                };
        }
    },
};

export {ServiceUtil as default, ServiceResponseContentType, ServiceRequestFormat};
