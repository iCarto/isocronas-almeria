const SVGUtil = {
    translateLeafletStyle(leafletStyle) {
        let style = "";
        if (leafletStyle) {
            if (leafletStyle.color) {
                style += `stroke-width="${
                    leafletStyle.weight ? leafletStyle.weight : "2"
                }" stroke-opacity="${
                    leafletStyle.opacity ? leafletStyle.opacity : "1"
                }" stroke="${leafletStyle.color}"`;
            }
            if (leafletStyle.fillColor) {
                style += ` fill-opacity="${
                    leafletStyle.fillOpacity ? leafletStyle.fillOpacity : "1"
                }" fill="${leafletStyle.fillColor}"`;
            } else {
                style += " fill-opacity=0";
            }
        }
        return style;
    },

    getLine(length, leafletStyle) {
        return `<svg width="${length}" height="5" ><line x1="0" y1="5" x2="${length}" y2="5" ${this.translateLeafletStyle(
            leafletStyle
        )} /></svg>`;
    },

    getCircle(radius, leafletStyle) {
        return `<svg viewBox="0 0 ${radius * 2} ${
            radius * 2
        }" width="${radius}" height="${radius}" ${this.translateLeafletStyle(
            leafletStyle
        )}><circle cx="${radius}" cy="${radius}" r="${radius - 1}" /></svg>`;
    },

    getSquare(border, leafletStyle) {
        return `<svg viewBox="0 0 ${border} ${border}" width="${border}" height="${border}" ${this.translateLeafletStyle(
            leafletStyle
        )}><rect width="${border}" height="${border}" /></svg>`;
    },
};

export default SVGUtil;
