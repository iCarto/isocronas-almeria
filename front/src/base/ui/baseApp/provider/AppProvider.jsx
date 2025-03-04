import {createContext, useContext} from "react";
import {useScopedFilters} from "base/filter/hooks";

let AppProviderContext = createContext(null);

export default function AppProvider({defaultFilter = {}, children}) {
    const {filter: appFilter, setFilterValue} = useScopedFilters({
        defaultFilter,
        scope: "app",
    });

    let value = {
        appFilter,
        setFilterValue,
    };

    return (
        <AppProviderContext.Provider value={value}>
            {children}
        </AppProviderContext.Provider>
    );
}

function useAppContext() {
    return useContext(AppProviderContext);
}

export {useAppContext};
