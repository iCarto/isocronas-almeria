import FetchService from "base/api/utilities/FetchService";
import {ErrorUtil} from "base/error/utilities";

const baseUrl = "http://localhost:3000/geoserver/wfs";

const WfsService = {
    get(url, headers = {}) {
        return FetchService.get(`${baseUrl}?${url}`, {
            headers,
        })
            .then(data => {
                return data;
            })
            .catch(error => {
                ErrorUtil.handleError(error);
            });
    },
};

export default WfsService;
