import {useState, createContext, useContext, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {FilterUtil} from "base/filter/utilities";
import {SearchParamsUtil} from "base/navigation/utilities";

import {useModuleContext} from "base/ui/module/provider";

let ListPageGroupContext = createContext(null);

const defaultUrlParamsConfig = {
    useQueryParams: false,
};

export default function ListPageGroupProvider({
    path: defaultPath,
    defaultFilter: defaultPageFilter,
    urlParamsConfig = defaultUrlParamsConfig,
    children,
}) {
    const {useQueryParams} = urlParamsConfig;
    const {moduleFilter, path: modulePath} = useModuleContext();
    const {updateParamsFromFilter} = SearchParamsUtil;

    const persistentFilters = FilterUtil.cleanFilter({
        ...moduleFilter,
        ...defaultPageFilter,
    });

    const [path, setPath] = useState(defaultPath);
    const [basePath, setBasePath] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const urlParams = Object.fromEntries(searchParams.entries());

    const [pageGroupFilter, setInternalPageGroupFilter] = useState(() => {
        return FilterUtil.cleanFilter({
            ...urlParams,
        });
    });

    useEffect(() => {
        console.log("path", `/${modulePath}/${path}`);
        setBasePath(`/${modulePath}/${path}`);
    }, [path, modulePath]);

    useEffect(() => {
        if (!FilterUtil.equalsFilter(urlParams, persistentFilters)) {
            changeFilter(urlParams);
        }
    }, [urlParams]);

    // Keep URL changes synched with filter
    useEffect(() => {
        if (!useQueryParams) return;

        if (searchParams.size === 0) {
            resetFilter();
        }

        if (!FilterUtil.equalsFilter(urlParams, pageGroupFilter)) {
            changeFilter(urlParams);
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

            if (useQueryParams) {
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

        if (useQueryParams) {
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
