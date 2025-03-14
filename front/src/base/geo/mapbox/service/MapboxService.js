import {ErrorUtil} from "base/error/utilities";

const baseUrl = "https://api.mapbox.com/";
const token = process.env.REACT_APP_MAPBOX_TOKEN;

const MapboxService = {
    get(path, params) {
        return fetch(`${baseUrl}${path}${params}&access_token=${token}`, {
            method: "GET",
        })
            .then(ErrorUtil.handleFetchResponse)
            .then(data => {
                console.log({data});
                return data;
            })
            .catch(error => {
                ErrorUtil.handleError(error);
            });
    },
};

export default MapboxService;
