import {ErrorUtil} from "base/error/utilities";

const MapboxIsochroneService = {
    get(params) {
        const url = params.getURL();
        return fetch(url, {
            method: "GET",
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

export default MapboxIsochroneService;
