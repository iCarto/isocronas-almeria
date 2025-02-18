import {ApiService, AuthService} from "base/api/service";
import {ErrorUtil} from "base/error/utilities";

const AuthApiService = {
    get(url, headers) {
        return ApiService.get(url, {
            Authorization: "Bearer " + AuthService.getAccessToken(),
            ...headers,
        }).catch(e => {
            return ErrorUtil.handleError(e).then(retryRequest => {
                if (retryRequest) {
                    return AuthApiService.get(url, headers);
                } else {
                    window.location.reload();
                }
            });
        });
    },

    post(url, data, headers) {
        return ApiService.post(url, data, {
            Authorization: "Bearer " + AuthService.getAccessToken(),
            ...headers,
        }).catch(e => {
            return ErrorUtil.handleError(e).then(retryRequest => {
                if (retryRequest) {
                    return AuthApiService.post(url, data, headers);
                } else {
                    window.location.reload();
                }
            });
        });
    },

    put(url, data) {
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.put(url, data, headers).catch(e => {
            return ErrorUtil.handleError(e).then(retryRequest => {
                if (retryRequest) {
                    return AuthApiService.put(url, data);
                } else {
                    window.location.reload();
                }
            });
        });
    },

    patch(url, data, bulk = false) {
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.patch(url, data, bulk, headers).catch(e => {
            return ErrorUtil.handleError(e).then(retryRequest => {
                if (retryRequest) {
                    return AuthApiService.patch(url, data, bulk);
                } else {
                    window.location.reload();
                }
            });
        });
    },

    delete(url) {
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.delete(url, headers).catch(e => {
            return ErrorUtil.handleError(e).then(retryRequest => {
                if (retryRequest) {
                    return AuthApiService.delete(url);
                } else {
                    window.location.reload();
                }
            });
        });
    },

    upload(file, url, ...rest) {
        const headers = {
            Authorization: "Bearer " + AuthService.getAccessToken(),
        };
        return ApiService.upload(file, url, headers, ...rest);
    },
};

export default AuthApiService;
