import {useState, createContext, useContext, useEffect} from "react";
import {useParams} from "react-router-dom";

import {useModuleContext} from "base/ui/module/provider";
import {useListPageGroupContext} from "base/ui/page/provider";

let SubPageContext = createContext(null);

export default function PageProvider({children}) {
    const {id} = useParams();

    const [path, setPath] = useState(id);
    const [basePath, setBasePath] = useState(null);
    const [isSidebarPanelOpen, setSidebarPanelOpen] = useState(false);

    const {path: modulePath} = useModuleContext();
    const {path: pageGroupPath} = useListPageGroupContext();

    useEffect(() => {
        setBasePath(`/${modulePath}/${pageGroupPath}/${path}`);
    }, [path, modulePath]);

    let value = {
        path,
        setPath,
        basePath,
        isSidebarPanelOpen,
        setSidebarPanelOpen,
    };

    return <SubPageContext.Provider value={value}>{children}</SubPageContext.Provider>;
}

function usePageContext() {
    return useContext(SubPageContext);
}

export {usePageContext};
