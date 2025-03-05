import {Storage} from "base/storage";
import JsonFileService from "base/file/service/JsonFileService";

const municipalitiesJSONPath = "/bboxes";
const storageKey = "municipalities";

const MunicipalityRepository = {
    getList() {
        const storedMunicipalities = Storage.get(storageKey);
        if (storedMunicipalities) {
            return Promise.resolve(JSON.parse(storedMunicipalities));
        }

        return JsonFileService.get(municipalitiesJSONPath, "/tools").then(response => {
            Storage.set(storageKey, JSON.stringify(response));
            return response;
        });
    },
};

export default MunicipalityRepository;
