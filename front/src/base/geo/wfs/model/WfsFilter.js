import {WfsServiceUtil} from "base/api/utilities";

class WfsFilter {
    #category;
    #featureID;

    get category() {
        return this.#category;
    }

    get featureID() {
        return this.#featureID;
    }

    constructor(category, featureID) {
        this.#category = category;
        this.#featureID = featureID;
    }

    getCqlFilter() {
        return WfsServiceUtil.buildCqlFilter({
            category: this.category,
            featureID: this.featureID,
        });
    }
}

const createWfsFilter = ({category = null, featureID = null}) => {
    return new WfsFilter(category, featureID);
};

export default createWfsFilter;
