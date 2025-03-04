import {useState, createContext, useContext, useEffect} from "react";

import {useModuleContext} from "base/ui/module/provider";
import {useScopedFilters} from "base/filter/hooks";

let ListPageGroupContext = createContext(null);

export default function ListPageGroupProvider({
    path: defaultPath,
    defaultFilter,
    children,
}) {
    const {moduleFilter, path: modulePath} = useModuleContext();
    const [path, setPath] = useState(defaultPath);
    const [basePath, setBasePath] = useState(null);

    const {
        filter: pageGroupFilter,
        setFilterValue,
        resetFilter,
        searchParams,
    } = useScopedFilters({
        defaultFilter,
        scope: "page",
        externalFilter: moduleFilter,
    });

    useEffect(() => {
        console.log("path", `${modulePath}/${path}`);
        setBasePath(`${modulePath}/${path}`);
    }, [path, modulePath]);

    let value = {
        path,
        setPath,
        basePath,
        pageGroupFilter,
        setFilterValue,
        resetFilter,
        searchParams,
    };

    return (
        <ListPageGroupContext.Provider value={value}>
            {children}
        </ListPageGroupContext.Provider>
    );
}

function useListPageGroupContext() {
    return useContext(ListPageGroupContext);
}

export {useListPageGroupContext};
