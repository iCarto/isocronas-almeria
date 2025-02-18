import {createContext, useContext} from "react";

let EntityCreatePageContext = createContext(null);

export default function EntityCreatePageProvider({service, children}) {
    let value = {
        service,
    };

    return (
        <EntityCreatePageContext.Provider value={value}>
            {children}
        </EntityCreatePageContext.Provider>
    );
}

function useEntityCreatePageContext() {
    return useContext(EntityCreatePageContext);
}

export {useEntityCreatePageContext};
