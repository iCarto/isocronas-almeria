import {useState, useEffect, createContext, useContext} from "react";
import {useErrors} from "base/error/provider";
import {DomainRepository} from "base/domain/repository";
import {useLinguiI18N} from "base/i18n/lingui";

let DomainContext = createContext(null);

export default function DomainProvider({dataSource = null, children}) {
    const {handleErrors} = useErrors();

    const {selectedLocale} = useLinguiI18N();

    const [domains, setDomains] = useState(null);

    const service =
        dataSource === "json"
            ? DomainRepository.getDomainsFromJSON
            : DomainRepository.getDomains;

    useEffect(() => {
        service()
            .then(domains => {
                setDomains(domains);
            })
            .catch(error => {
                handleErrors(error);
            });
    }, [selectedLocale]);

    let value = {
        domains,
    };

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

function useDomainContext() {
    return useContext(DomainContext);
}

export {useDomainContext};
