import {useState, createContext, useContext, useEffect} from "react";
import {FilterUtil} from "base/filter/utilities";
import {SearchParamsUtil} from "base/navigation/utilities";

import {useModuleContext} from "base/ui/module/provider";
import {useUrlParams} from "base/navigation/provider";

let ListPageGroupContext = createContext(null);

export default function ListPageGroupProvider({
    path: defaultPath,
    defaultFilter: defaultPageFilter,
    children,
}) {
    const {moduleFilter, path: modulePath} = useModuleContext();
    const {updateParamsFromFilter} = SearchParamsUtil;
    const {
        queryParamsEnabled,
        searchParams,
        setSearchParams,
        defaultParams,
        urlFilters: initialUrlFilters,
    } = useUrlParams();

    const persistentFilters = FilterUtil.cleanFilter({
        ...moduleFilter,
        ...defaultPageFilter,
    });

    const [path, setPath] = useState(defaultPath);
    const [basePath, setBasePath] = useState(null);

    const [pageGroupFilter, setInternalPageGroupFilter] = useState(() => {
        return FilterUtil.cleanFilter({
            ...initialUrlFilters,
        });
    });

    SearchParamsUtil.getSearchParamsByType(searchParams, defaultParams);

    useEffect(() => {
        console.log("path", `/${modulePath}/${path}`);
        setBasePath(`/${modulePath}/${path}`);
    }, [path, modulePath]);

    useEffect(() => {
        if (!FilterUtil.equalsFilter(initialUrlFilters, persistentFilters)) {
            changeFilter(initialUrlFilters);
        }
    }, [initialUrlFilters]);

    // Keep URL changes synched with filter
    useEffect(() => {
        if (!queryParamsEnabled) return;

        if (searchParams.size === 0) {
            resetFilter();
        }

        if (!FilterUtil.equalsFilter(initialUrlFilters, pageGroupFilter)) {
            changeFilter(initialUrlFilters);
        }
    }, [searchParams]);

    const changeFilter = propertiesChanged => {
        const cleanedFilter = FilterUtil.cleanFilter({
            ...pageGroupFilter,
            ...propertiesChanged,
        });

        if (!FilterUtil.equalsFilter(pageGroupFilter, cleanedFilter)) {
            console.log("changing page group filter", {cleanedFilter});

            setInternalPageGroupFilter({...cleanedFilter});

            if (queryParamsEnabled) {
                const params = updateParamsFromFilter(searchParams, cleanedFilter);

                setSearchParams(params);
            }
        }
    };

    const setFilterValue = (property, value) => {
        const newProperty = {};
        newProperty[property] = value;
        changeFilter(newProperty);
    };

    const resetFilter = () => {
        console.log("resetting page group filter");
        setInternalPageGroupFilter(persistentFilters);

        if (queryParamsEnabled) {
            const persistentParams = new URLSearchParams(persistentFilters);
            setSearchParams(persistentParams);
        }
    };

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
