class LegendDiscriminatorItem {
    #code;
    #label;
    #style;
    #filter;

    constructor(code, label, style, filter) {
        this.#code = code;
        this.#label = label;
        this.#style = style;
        this.#filter = filter;
    }

    get code() {
        return this.#code;
    }

    get label() {
        return this.#label;
    }

    get style() {
        return this.#style;
    }

    get filter() {
        return this.#filter;
    }
}

export function createLayerLegendDiscriminatorItem({code, label, style, filter}) {
    return new LegendDiscriminatorItem(code, label, style, filter);
}
