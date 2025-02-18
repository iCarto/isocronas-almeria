class LegendDiscriminator {
    #name;
    #field;
    #style;
    #entries;

    constructor(name, field, style, entries) {
        this.#name = name;
        this.#field = field;
        this.#style = style;
        this.#entries = entries;
    }

    get name() {
        return this.#name;
    }

    get field() {
        return this.#field;
    }

    get style() {
        return this.#style;
    }

    get entries() {
        return this.#entries;
    }
}

export function createLayerLegendDiscriminator({
    name,
    field,
    style = "default",
    entries,
}) {
    return new LegendDiscriminator(name, field, style, entries);
}
