import FetchService from "base/api/utilities/FetchService";
import {ErrorUtil} from "base/error/utilities";

const WfsService = {
    get({url, headers = {}}) {
        return FetchService.get(url, {
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
