import {t} from "@lingui/macro";
import {alertType, FetchError} from "base/error/model";
import {AlertService, ErrorService} from "base/error/service";

const ErrorUtil = {
    async handleFetchResponse(response) {
        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            let errorData;

            if (contentType?.includes("application/json")) {
                errorData = await response.json();
            } else {
                errorData = await response.text();
            }

            throw new FetchError(
                errorData.message || t`Error when fetching data`,
                response.status,
                errorData
            );
        }
        if (response.headers.get("content-type")?.includes("application/json")) {
            return response.json();
        }
        return response;
    },

    handleError(error) {
        return ErrorService.handleError(error);
    },

    processErrorToAlerts(error) {
        const alerts = [];
        const jsonError = this.parseJsonError(error);

        if (typeof jsonError === "object" && !Array.isArray(jsonError)) {
            alerts.push(...this.processApiErrorsToAlerts(jsonError));
        } else {
            alerts.push(...AlertService.createAlertList(alertType.ERROR, jsonError));
        }

        return alerts;
    },

    /**
     * Given an object with error messages returned by a Django API, this method
     * converts it into a list of alerts.
     * Accepted param formats:
     * - {fieldName1: ["message"], fieldName2: ["message"]}
     * - {detail: ["message"]}
     *
     * @param {Object} jsonError - Error messages returned by Django API.
     * @return {Array} - List of alerts.
     */
    processApiErrorsToAlerts(jsonError) {
        const alerts = [];

        const status = jsonError.statusCode;

        Object.entries(jsonError).forEach(([key, value]) => {
            if (key === "statusCode") {
                return;
            }

            if (key === "detail") {
                key = null;
            }

            const fieldAlerts = AlertService.createAlertList(
                alertType.ERROR,
                value.toString(),
                key,
                status
            );
            alerts.push(...fieldAlerts);
        });

        return alerts;
    },

    parseJsonError(error) {
        let jsonError;

        if (error instanceof FetchError) {
            try {
                jsonError = error.json();
            } catch (err) {
                jsonError = error;
            }
        } else {
            try {
                const parsed = JSON.parse(error);
                jsonError = this.processApiErrorsToAlerts(parsed);
            } catch (err) {
                jsonError = error;
            }
        }

        return jsonError;
    },
};

export {ErrorUtil};
