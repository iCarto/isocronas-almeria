import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export function useBasePath(providedRoute = "") {
    const location = useLocation();
    const [basePath, setBasePath] = useState(null);

    useEffect(() => {
        const calcBasePath = location.pathname
            .split("/")
            .slice(0, 0 - providedRoute.split("/").length)
            .join("/");
        setBasePath(calcBasePath);
    }, [providedRoute]);

    return {basePath};
}
