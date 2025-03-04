import {AuthApiService} from "base/api/service";
import {createDomainEntries} from "../model";
import {Storage} from "base/storage";
import JsonFileService from "base/file/service/JsonFileService";

const domainsBasePath = "/api/domains/domains/tree";
const domainsJSONPath = "/domains";
const storageKey = "domains";

const DomainRepository = {
    getDomains() {
        return AuthApiService.get(domainsBasePath).then(response => {
            return createDomainEntries(response);
        });
    },
    getDomainsFromJSON() {
        const storedDomains = Storage.get(storageKey);
        if (storedDomains) {
            return Promise.resolve(JSON.parse(storedDomains));
        }

        return JsonFileService.get(domainsJSONPath, "/tools").then(response => {
            Storage.set(storageKey, JSON.stringify(response));
            return response;
        });
    },
};

export default DomainRepository;
