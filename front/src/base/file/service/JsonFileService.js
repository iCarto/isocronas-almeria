import {ErrorUtil} from "base/error/utilities";

const JsonFileService = {
    get(url = "", baseUrl = "/api_data", headers = {}) {
        console.log("Fetching " + baseUrl + url + ".json");
        url = url.replace(/\/$/, "");
        url = url.split("?")[0];
        return fetch(baseUrl + url + ".json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then(response => response.json())
            .catch(error => ErrorUtil.handleErrors(error));
    },

    post(url = "", body = {}, contentType = "application/json", headers = {}) {
        return this.get(url, headers);
    },

    put(url = "", body = {}, headers = {}) {
        return Promise.resolve("Not yet implemented");
    },

    patch(url = "", body = {}, headers = {}) {
        return Promise.resolve("Not yet implemented");
    },

    del(url = "", headers = {}) {
        return Promise.resolve("Not yet implemented");
    },
};

export default JsonFileService;
