import {ErrorBoundary} from "@sentry/react";
import {ErrorFallback} from "base/error/components";

const SentryErrorBoundary = ({children}) => {
    const errorFallback = ({error, resetError}) => (
        <ErrorFallback error={error} resetErrorBoundary={resetError} />
    );

    return (
        <ErrorBoundary fallback={errorFallback} showDialog>
            {children}
        </ErrorBoundary>
    );
};

export default SentryErrorBoundary;
