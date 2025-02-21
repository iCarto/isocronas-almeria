import {useState, createContext, useContext, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useEntityListPageContext} from ".";
import {useErrors} from "base/error/provider";

let EntityPageContext = createContext(null);

export default function EntityPanelProvider({children}) {
    const location = useLocation();
    const {id} = useParams();
    const {service} = useEntityListPageContext();

    const [element, setElement] = useState(null);
    const [loading, setLoading] = useState(null);
    const {handleErrors, clearErrors} = useErrors();

    useEffect(() => {
        setLoading(true);
        setElement(null);
        console.log({id});
        service
            .get(id)
            .then(data => {
                console.log({data});
                clearErrors();
                setElement(data);
            })
            .catch(error => {
                handleErrors(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, location.state?.lastRefreshDate]);

    let value = {
        service,
        element,
        setElement,
        loading,
    };

    return (
        <EntityPageContext.Provider value={value}>
            {children}
        </EntityPageContext.Provider>
    );
}

function useEntityPanelContext() {
    return useContext(EntityPageContext);
}

export {useEntityPanelContext};
