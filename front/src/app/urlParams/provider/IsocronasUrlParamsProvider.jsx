import {createContext, useContext} from "react";
import {IsocronasUrlParamsConfig} from "../config";
import {UrlParamsProvider} from "base/navigation/provider";

let IsocronasUrlParamsContext = createContext(null);

export default function IsocronasUrlParamsProvider({children}) {
    return (
        <UrlParamsProvider config={IsocronasUrlParamsConfig}>
            {children}
        </UrlParamsProvider>
    );
}

function useIsocronasUrlParams() {
    return useContext(IsocronasUrlParamsContext);
}

export {useIsocronasUrlParams};
