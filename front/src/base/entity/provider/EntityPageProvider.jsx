import {useState, createContext, useContext, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useErrors} from "base/error/provider";

let EntityPageContext = createContext(null);

export default function EntityPageProvider({service, children}) {
    const {handleErrors, clearErrors} = useErrors();
    const location = useLocation();
    const {id} = useParams();

    const [element, setElement] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        setLoading(true);
        setElement(null);
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

function useEntityPageContext() {
    return useContext(EntityPageContext);
}

export {useEntityPageContext};
