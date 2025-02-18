import {createContext, useContext, useState, useEffect} from "react";
import {useFormContext} from "react-hook-form";
import {RulesRepository} from "../repository";
import useRulesEngineRequired from "../hooks/RulesEngineRequiredHook";
import useRulesEngineHidden from "../hooks/RulesEngineHiddenHook";
import useRulesEngineValue from "../hooks/RulesEngineValueHook";

const RulesEngineContext = createContext(null);

export default function RulesEngineProvider({modelName, context = {}, children}) {
    const [rules, setRules] = useState(null);
    const {watch} = useFormContext();

    const {updateFieldsValue} = useRulesEngineValue(rules, context);
    const {required, updateRequiredFields} = useRulesEngineRequired(rules, context);
    const {hidden, updateHiddenFields} = useRulesEngineHidden(rules, context);

    useEffect(() => {
        RulesRepository.getModelRules(modelName)
            .then(rules => {
                console.log({rules});
                setRules(rules);
            })
            .catch(error => {
                console.log("No rules file", {error});
            });
    }, []);

    useEffect(() => {
        if (rules) {
            const updateFields = userUpdatedField => {
                updateFieldsValue(userUpdatedField);
                updateRequiredFields(userUpdatedField);
                updateHiddenFields(userUpdatedField);
            };

            const subscription = watch((formData, {name, type}) => {
                if (name) {
                    updateFields(name);
                }
            });

            return () => {
                if (subscription?.unsubscribe) {
                    subscription.unsubscribe();
                }
            };
        }
    }, [watch, rules]);

    const isFieldHidden = fieldName => {
        return hidden.includes(fieldName);
    };

    const isFieldRequired = fieldName => {
        return required.includes(fieldName);
    };

    return (
        <RulesEngineContext.Provider value={{isFieldHidden, isFieldRequired}}>
            {children}
        </RulesEngineContext.Provider>
    );
}

// Custom hook to use the RulesEngine
export const useRulesEngine = () => {
    const context = useContext(RulesEngineContext);
    if (!context) {
        // Provide default behavior when used outside of RulesEngineProvider
        return {
            isFieldHidden: () => false,
            isFieldRequired: () => false,
        };
    }
    return context;
};
