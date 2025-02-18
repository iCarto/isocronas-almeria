import {AuthApiService} from "base/api/service";

const configUrl = "/static/config/rules";

const RulesRepository = {
    getModelRules(modelName) {
        return AuthApiService.get(`${configUrl}/${modelName}.json`);
    },
};

export default RulesRepository;
