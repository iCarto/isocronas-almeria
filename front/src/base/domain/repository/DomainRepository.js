import {AuthApiService} from "base/api/service";
import {createDomainEntries} from "../model";
import JsonFileService from "base/file/service/JsonFileService";

const domainsBasePath = "/api/domains/domains/tree";
const domainsJSONPath = "/domains";

const DomainRepository = {
    getDomains() {
        return AuthApiService.get(domainsBasePath).then(response => {
            return createDomainEntries(response);
        });
    },
    getDomainsFromJSON() {
        return JsonFileService.get(domainsJSONPath, "/tools").then(response => {
            return response;
        });
    },
};

export default DomainRepository;
