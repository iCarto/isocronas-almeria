import {useState, createContext, useContext} from "react";
import {FormProvider, useForm} from "react-hook-form";

import {useErrors} from "base/error/provider";
import {FormUtil} from "base/form/utilities";

let EntityFormContext = createContext(null);

export default function EntityFormProvider({
    element,
    createFunction,
    onSubmit: onSubmitForm,
    onCancel,
    hideCancelButton = false,
    defaultValues = {},
    disableForm = false,
    children,
}) {
    const [submitting, setSubmitting] = useState(null);
    const {handleErrors, clearErrors} = useErrors();

    const formObject = element || createFunction();

    const formMethods = useForm({
        defaultValues: FormUtil.getDefaultValues(formObject, {...defaultValues}),
        reValidateMode: "onSubmit",
    });

    const handleSubmit = data => {
        clearErrors();
        setSubmitting(true);
        return onSubmitForm(createFunction(FormUtil.getDataValues(data)))
            .catch(error => {
                handleErrors(error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const onSubmit = formMethods.handleSubmit(handleSubmit);

    const handleCancel = () => {
        clearErrors();
        onCancel();
    };

    let value = {
        element,
        submitting,
        onSubmit,
        onCancel: handleCancel,
        hideCancelButton,
        disableForm,
    };

    return (
        <EntityFormContext.Provider value={value}>
            <FormProvider {...formMethods}>{children}</FormProvider>
        </EntityFormContext.Provider>
    );
}

function useEntityFormContext() {
    return useContext(EntityFormContext);
}

export {useEntityFormContext};
