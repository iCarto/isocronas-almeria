import {useState, useEffect, createContext, useContext} from "react";
import {useErrors} from "base/error/provider";
import {DomainRepository} from "base/domain/repository";
import {useLinguiI18N} from "base/i18n/lingui";
import {ErrorService} from "base/error/service";
import JsonFileService from "base/file/service/JsonFileService";

let DomainContext = createContext(null);

export default function DomainProvider({dataSource = null, children}) {
    const {handleErrors} = useErrors();

    const {selectedLocale} = useLinguiI18N();

    const [domains, setDomains] = useState(null);
    const [municipalities, setMunicipalities] = useState([]);

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

    // TO-DO: This should not be under "base" code --Move
    useEffect(() => {
        JsonFileService.get("/bboxes", "/tools")
            .then(response => setMunicipalities(response))
            .catch(error => ErrorService.handleError(error));
    }, []);

    let value = {
        domains,
        municipalities,
    };

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

function useDomainContext() {
    return useContext(DomainContext);
}

export {useDomainContext};
