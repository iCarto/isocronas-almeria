import {useMemo} from "react";
import {useDomainContext} from "base/domain/provider";

function useDomainUtil(elements, domainLabel, attributeLabel) {
    const {domains} = useDomainContext();

    const types = domains[domainLabel] || [];

    const getAvailableTypes = () => {
        if (types) {
            if (elements?.length) {
                const usedTypes = new Set(
                    elements?.map(element => element[attributeLabel]).filter(Boolean)
                );

                const availableOptions = types.map(option => ({
                    ...option,
                    disabled: usedTypes.has(option.value),
                }));

                return availableOptions;
            }
            return types;
        }
        return [];
    };

    const availableTypes = useMemo(() => getAvailableTypes(), [domains, elements]);

    return {
        availableTypes,
    };
}

export {useDomainUtil};
