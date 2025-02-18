import {useState, createContext, useContext, useEffect} from "react";
import {useLocation} from "react-router-dom";

import {useErrors} from "base/error/provider";
import {useListPageGroupContext} from "base/ui/page/provider";

let EntityListPageContext = createContext(null);

export default function EntityListPageProvider({service, children}) {
    const {handleErrors, clearErrors} = useErrors();
    const location = useLocation();

    const [elements, setElements] = useState([]);
    const [view, setView] = useState("table");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(0);
    const [sort, setSort] = useState("name");
    const [order, setOrder] = useState("asc");
    const [loading, setLoading] = useState(false);

    const [selectedElement, setSelectedElement] = useState(null);

    const {pageGroupFilter} = useListPageGroupContext();

    console.log({...pageGroupFilter}, page, sort, order);

    useEffect(() => {
        setLoading(true);
        const serviceCall =
            typeof service === "function"
                ? service({...pageGroupFilter}, page, sort, order)
                : service.getList({...pageGroupFilter}, page, sort, order);
        serviceCall
            .then(data => {
                console.log(data);
                clearErrors();
                setElements(data.results);
                setSize(data.count);
            })
            .catch(error => {
                handleErrors(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [pageGroupFilter, page, sort, order, location.state?.lastRefreshDate]);

    let value = {
        service,
        elements,
        loading,
        view,
        setView,
        page,
        setPage,
        size,
        setSize,
        sort,
        setSort,
        order,
        setOrder,
        selectedElement,
        setSelectedElement,
    };

    return (
        <EntityListPageContext.Provider value={value}>
            {children}
        </EntityListPageContext.Provider>
    );
}

function useEntityListPageContext() {
    return useContext(EntityListPageContext);
}

export {useEntityListPageContext};
