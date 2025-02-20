import {t} from "@lingui/macro";

const alertType = Object.freeze({
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
});

class BaseAlert {
    constructor(type, message, field = null, status = null) {
        this.#validateType(type);
        this.type = type;
        this.message = this.#formatMessage(message, field, status);
        this.field = field;
        this.status = status;
    }

    #validateType(type) {
        if (!Object.values(alertType).includes(type)) {
            throw new Error(`Invalid alert type: ${type}`);
        }
    }

    #formatMessage(message = null, field = null, status = null) {
        let formattedMessage = "";

        if (field) {
            formattedMessage += `${field}: `;
        }
        if (status) {
            formattedMessage += t` [Status: ${status}] `;
        }
        formattedMessage += ` ${message}`;

        return formattedMessage;
    }

    toString() {
        return this.message;
    }

    log() {
        switch (this.type) {
            case alertType.ERROR:
                console.error(`${this.message} - Error ${this.status}`);
                break;
            case alertType.WARNING:
                console.warn(this.message);
                break;
            default:
                console.info(this.message);
        }
    }
}

class ErrorAlert extends BaseAlert {
    constructor(message, field = null, status = null) {
        super(alertType.ERROR, message, field, status);
    }
}

class WarningAlert extends BaseAlert {
    constructor(message, field = null) {
        super(alertType.WARNING, message, field);
    }
}

class InfoAlert extends BaseAlert {
    constructor(message, field = null) {
        super(alertType.INFO, message, field);
    }
}

const alertClassMap = {
    [alertType.ERROR]: ErrorAlert,
    [alertType.WARNING]: WarningAlert,
    [alertType.INFO]: InfoAlert,
};

export {BaseAlert, alertType, alertClassMap};
