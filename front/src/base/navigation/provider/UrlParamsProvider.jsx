import {createContext, useContext} from "react";
import {useSearchParams} from "react-router-dom";
import {SearchParamsUtil} from "../utilities";

let UrlParamsContext = createContext(null);

const defaultUrlParamsConfig = {
    queryParamsEnabled: false,
    params: {},
};

export default function UrlParamsProvider({config = defaultUrlParamsConfig, children}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const urlFilters = SearchParamsUtil.getSearchParamsByType(
        searchParams,
        config.params
    );
    const urlActions = SearchParamsUtil.getSearchParamsByType(
        searchParams,
        config.params,
        "action"
    );

    return (
        <UrlParamsContext.Provider
            value={{
                queryParamsEnabled: config.queryParamsEnabled,
                urlParamsConfig: config,
                searchParams,
                setSearchParams,
                urlFilters,
                urlActions,
            }}
        >
            {children}
        </UrlParamsContext.Provider>
    );
}

function useUrlParams() {
    return useContext(UrlParamsContext);
}

export {useUrlParams};
