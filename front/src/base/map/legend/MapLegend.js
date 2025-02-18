class Legend {
    #code;
    #label;
    #icon;
    #options;

    constructor(code, label, icon, options) {
        this.#code = code;
        this.#label = label;
        this.#icon = icon;
        this.#options = options;
    }

    get code() {
        return this.#code;
    }

    get label() {
        return this.#label;
    }

    get icon() {
        return this.#icon;
    }

    get options() {
        return this.#options;
    }
}

export function createLayerLegend({code, label, icon = null, options = null}) {
    return new Legend(code, label, icon, options);
}
