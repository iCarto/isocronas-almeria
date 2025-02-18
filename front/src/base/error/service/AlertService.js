import {t} from "@lingui/macro";
import {alertClassMap, alertType} from "base/error/model";

const AlertService = {
    createAlertList(type, message, field = null, status = null) {
        const messageList = Array.isArray(message) ? message : [message];

        return messageList.map(message => {
            const alertMessage = message.toString();
            const AlertClass = this.getAlertClass(type);
            return new AlertClass(alertMessage, field, status);
        });
    },

    createErrorAlert(errorMessage) {
        return AlertService.createAlertList(alertType.ERROR, errorMessage);
    },

    getAlertClass(type) {
        const AlertClass = alertClassMap[type];
        if (!AlertClass) {
            throw new Error(t`Invalid alert type: ${type}`);
        }
        return AlertClass;
    },

    getTotalAlerts(alerts) {
        return alerts.reduce(
            (acc, alert) => {
                if (alert.type === "error") {
                    acc.errors += 1;
                } else if (alert.type === "warning") {
                    acc.warnings += 1;
                }
                return acc;
            },
            {errors: 0, warnings: 0}
        );
    },

    getTotalErrors(alerts) {
        return alerts.filter(item => item.type === "error").length;
    },
    getTotalWarnings(alerts) {
        return alerts.filter(item => item.type === "warning").length;
    },
};

export {AlertService};
