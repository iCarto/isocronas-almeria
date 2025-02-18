import {FilterUtil} from "base/filter/utilities";
import {useState, createContext, useContext} from "react";

let AppProviderContext = createContext(null);

export default function AppProvider({defaultFilter = {}, children}) {
    const [appFilter, setInternalAppFilter] = useState({...defaultFilter});

    const changeFilter = propertiesChanged => {
        const cleanedFilter = FilterUtil.cleanFilter({
            ...appFilter,
            ...propertiesChanged,
        });
        if (!FilterUtil.equalsFilter(appFilter, cleanedFilter)) {
            setInternalAppFilter({...cleanedFilter});
            console.log("app filter changed", {cleanedFilter});
        }
    };

    const setFilterValue = (property, value) => {
        const newProperty = {};
        newProperty[property] = value;
        console.log("changing app filter property", {newProperty});
        changeFilter(newProperty);
    };

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
