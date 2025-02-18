import {useErrors} from "base/error/provider";

import {ErrorAlertList, PageNotFoundAlert} from ".";

const ErrorAlerts = ({error: propError = null, onlyFieldless = false, ...props}) => {
    const {errors: contextErrors} = useErrors();

    const errors = propError ? [propError] : contextErrors;

    const filteredErrors = onlyFieldless
        ? errors?.filter(error => !error.field)
        : errors;

    if (!filteredErrors?.length) {
        return null;
    }

    console.log({filteredErrors});

    if (filteredErrors.some(error => error.status === 404)) {
        return <PageNotFoundAlert errors={filteredErrors} />;
    }

    return <ErrorAlertList errors={filteredErrors} props={props} />;
};

export default ErrorAlerts;
