import {useState, createContext, useContext} from "react";
import {useScopedFilters} from "base/filter/hooks";
import {useAppContext} from "base/ui/baseApp/provider";

let ModuleConfigContext = createContext(null);

export default function ModuleProvider({
    path: defaultPath,
    defaultFilter = {},
    children,
}) {
    const {appFilter} = useAppContext();

    const {filter: moduleFilter, setFilterValue: setModuleFilterValue} =
        useScopedFilters({
            defaultFilter: {
                ...appFilter,
                ...defaultFilter,
            },
            scope: "module",
            externalFilter: appFilter,
        });

    const [path, setPath] = useState(defaultPath);

    let value = {
        moduleFilter,
        setModuleFilterValue,
        path,
        setPath,
    };

    return (
        <ModuleConfigContext.Provider value={value}>
            {children}
        </ModuleConfigContext.Provider>
    );
}

function useModuleContext() {
    return useContext(ModuleConfigContext);
}

export {useModuleContext};
