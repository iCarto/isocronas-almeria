import {useState, useEffect} from "react";
import {useUrlParams} from "base/navigation/provider";
import {SearchParamsUtil} from "base/navigation/utilities";
import {FilterUtil} from "base/filter/utilities";

function useScopedFilters({defaultFilter, scope, externalFilter = {}}) {
    const {updateParamsFromFilter} = SearchParamsUtil;
    const {
        queryParamsEnabled,
        searchParams,
        setSearchParams,
        urlFilters: initialUrlFilters,
        urlParamsConfig,
    } = useUrlParams();

    const persistentFilters = FilterUtil.cleanFilter({
        ...externalFilter,
        ...defaultFilter,
        ...initialUrlFilters,
    });

    const [filter, setInternalFilter] = useState(() => {
        return FilterUtil.cleanFilter(
            FilterUtil.getScopedFilters(persistentFilters, urlParamsConfig, scope)
        );
    });

    useEffect(() => {
        if (!FilterUtil.equalsFilter(initialUrlFilters, persistentFilters)) {
            changeFilter(initialUrlFilters);
        }
    }, [initialUrlFilters]);

    useEffect(() => {
        if (!queryParamsEnabled) return;

        if (searchParams.size === 0) {
            resetFilter();
        }

        if (!FilterUtil.equalsFilter(initialUrlFilters, filter)) {
            changeFilter(initialUrlFilters);
        }
    }, [searchParams]);

    const changeFilter = propertiesChanged => {
        const scopedProperties = FilterUtil.getScopedFilters(
            propertiesChanged,
            urlParamsConfig,
            scope
        );

        if (Object.keys(scopedProperties).length) {
            console.log("Changing filter", {scope, scopedProperties});

            const cleanedFilter = FilterUtil.cleanFilter({
                ...filter,
                ...propertiesChanged,
            });

            if (!FilterUtil.equalsFilter(filter, cleanedFilter)) {
                setInternalFilter({...cleanedFilter});

                if (queryParamsEnabled && urlParamsConfig.params) {
                    const scopedFilters = FilterUtil.getScopedFilters(
                        cleanedFilter,
                        urlParamsConfig,
                        scope
                    );

                    const params = updateParamsFromFilter(searchParams, scopedFilters);
                    setSearchParams(params);
                }
            }
        }
    };

    const setFilterValue = (property, value) => {
        changeFilter({[property]: value});
    };

    const resetFilter = () => {
        console.log("Resetting filter", {scope});
        setInternalFilter(persistentFilters);

        if (queryParamsEnabled) {
            const persistentParams = new URLSearchParams(persistentFilters);
            setSearchParams(persistentParams);
        }
    };

    return {filter, setFilterValue, resetFilter, searchParams};
}

export default useScopedFilters;
