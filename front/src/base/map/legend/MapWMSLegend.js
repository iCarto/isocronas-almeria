class WMSLegendIcon {
    #type;
    #src;
    #style;

    constructor(type, src, style) {
        this.#type = type;
        this.#src = src;
        this.#style = style;
    }

    get type() {
        return this.#type;
    }

    get src() {
        return this.#src;
    }

    get style() {
        return this.#style;
    }
}

export function createWMSLegendIcon({type, src = null, style = null}) {
    return new WMSLegendIcon(type, src, style);
}

class WMSLegend {
    #code;
    #layerCodes;
    #label;
    #icon;
    #visible;
    #showGraphic;
    #children;

    constructor(code, layerCodes, label, icon, visible, showGraphic, children) {
        this.#code = code;
        this.#layerCodes = layerCodes;
        this.#label = label;
        this.#icon = icon;
        this.#visible = visible;
        this.#showGraphic = showGraphic;
        this.#children = children;
    }

    get code() {
        return this.#code;
    }

    get layerCodes() {
        return this.#layerCodes;
    }

    get label() {
        return this.#label;
    }

    get icon() {
        return this.#icon;
    }

    get visible() {
        return this.#visible;
    }

    get showGraphic() {
        return this.#showGraphic;
    }

    get children() {
        return this.#children;
    }
}

export function createWMSLegend({
    code,
    layerCodes = [],
    label,
    icon = null,
    visible = true,
    showGraphic = false,
    children = null,
}) {
    return new WMSLegend(code, layerCodes, label, icon, visible, showGraphic, children);
}
