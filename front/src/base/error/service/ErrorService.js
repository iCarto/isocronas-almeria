import {t} from "@lingui/macro";
import {FetchError} from "base/error/model";
import {AlertService} from "base/error/service";
import {AuthService} from "base/api/service";
import {ErrorUtil} from "base/error/utilities";

const ErrorService = {
    handleError(error) {
        if (error instanceof FetchError) {
            return this.handleFetchError(error);
        } else if (error instanceof TypeError) {
            return this.handleTypeError(error);
        } else if (error.response) {
            return this.handleResponseError(error);
        } else {
            return this.handleGenericError(error);
        }
    },

    handleFetchError(error) {
        const json = error.json();
        if (json && json.code === "token_not_valid") {
            return this.handleTokenError(json);
        }
        return this.handleGenericError(error);
    },

    handleTypeError(error) {
        throw AlertService.createErrorAlert(t`Internal server error: ${error.message}`);
    },

    handleResponseError(error) {
        const {status, data} = error.response;
        if (status === 401) {
            return this.handleUnauthorizedError();
        }
        return AlertService.createErrorAlert(data);
    },

    handleTokenError(json) {
        if (json.messages[0].token_class === "AccessToken") {
            console.log("ACCESS TOKEN EXPIRED");
            return AuthService.refreshToken()
                .then(() => true)
                .catch(this.handleTokenError);
        } else {
            console.log("REFRESH TOKEN EXPIRED");
            return this.handleUnauthorizedError();
        }
    },

    handleUnauthorizedError() {
        return AuthService.logout().then(() => false);
    },

    handleGenericError(error) {
        const errorAlerts = ErrorUtil.processErrorToAlerts(error);
        throw errorAlerts;
    },
};

export {ErrorService};
