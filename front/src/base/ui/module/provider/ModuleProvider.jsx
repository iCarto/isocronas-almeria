import {FilterUtil} from "base/filter/utilities";
import {useAppContext} from "base/ui/baseApp/provider";
import {useState, createContext, useContext, useEffect} from "react";

let ModuleConfigContext = createContext(null);

export default function ModuleProvider({
    path: defaultPath,
    defaultFilter = {},
    children,
}) {
    const {appFilter} = useAppContext();

    const [moduleFilter, setInternalModuleFilter] = useState({
        ...appFilter,
        ...defaultFilter,
    });
    const [path, setPath] = useState(defaultPath);

    useEffect(() => {
        console.log("changing app filter", {appFilter});
        changeFilter(appFilter);
    }, [appFilter]);

    const changeFilter = propertiesChanged => {
        const cleanedFilter = FilterUtil.cleanFilter({
            ...moduleFilter,
            ...propertiesChanged,
        });
        if (!FilterUtil.equalsFilter(moduleFilter, cleanedFilter)) {
            setInternalModuleFilter({...cleanedFilter});
            console.log("filter module changed", {cleanedFilter});
        }
    };

    const setModuleFilterValue = (property, value) => {
        const newProperty = {};
        newProperty[property] = value;
        console.log("changing modlue filter property", {newProperty});
        changeFilter(newProperty);
    };

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
