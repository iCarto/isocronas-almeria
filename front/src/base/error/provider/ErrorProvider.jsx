import {createContext, useContext, useState} from "react";
import {BaseAlert} from "../model";
import {ErrorUtil} from "../utilities";

let ErrorContext = createContext(null);

export default function ErrorProvider({children}) {
    const [errors, setErrors] = useState(null);

    const handleErrors = error => {
        const errorList = Array.isArray(error) ? error : [error];
        const parsedErrors = errorList.map(err =>
            err instanceof BaseAlert ? err : ErrorUtil.handleError(err)
        );
        parsedErrors.forEach(err => err.log());
        setErrors(parsedErrors);
    };

    const clearErrors = () => {
        setErrors(null);
    };

    return (
        <ErrorContext.Provider value={{errors, handleErrors, clearErrors}}>
            {children}
        </ErrorContext.Provider>
    );
}

function useErrors() {
    return useContext(ErrorContext);
}

export {useErrors};
