import {SVGUtil} from "base/map/svg";

const GeojsonDiscriminatorUtil = {
    applyPointsDiscriminatorStyle(
        layer,
        discriminator,
        discriminatorItems,
        defaultStyle
    ) {
        const discriminatorItemsFound = discriminator.entries
            .filter(discriminatorItem => {
                return discriminatorItems.includes(discriminatorItem.code);
            })
            .filter(discriminatorItem =>
                discriminatorItem.filter(layer.feature.properties[discriminator.field])
            );

        if (discriminatorItemsFound.length > 0) {
            let tooltipContent = "";
            discriminatorItemsFound.forEach(discriminatorItemApplied => {
                tooltipContent += SVGUtil.getCircle(10, discriminatorItemApplied.style);
            });
            if (layer.getBounds() && layer.getBounds().isValid()) {
                layer.bindTooltip(tooltipContent, {
                    permanent: true,
                    direction: "center",
                    className: "points-container",
                });
            }
            layer.setStyle({
                ...defaultStyle,
            });
        } else {
            layer.closeTooltip();
        }
    },

    applyDefaultDiscriminatorStyle(
        layer,
        discriminator,
        discriminatorItems,
        defaultStyle
    ) {
        const discriminatorItemApplied = discriminator.entries
            .filter(discriminatorItem => {
                return discriminatorItems.includes(discriminatorItem.code);
            })
            .find(discriminatorItem =>
                discriminatorItem.filter(layer.feature.properties[discriminator.field])
            );

        if (discriminatorItemApplied) {
            layer.setStyle({
                ...defaultStyle,
                ...discriminatorItemApplied.style,
            });
        } else {
            layer.closeTooltip();
            layer.setStyle({
                opacity: 0,
                fillOpacity: 0,
            });
        }
    },

    applyDiscriminatorStyle(layer, discriminator, discriminatorItems, defaultStyle) {
        if (discriminator.style === "points") {
            this.applyPointsDiscriminatorStyle(
                layer,
                discriminator,
                discriminatorItems,
                defaultStyle
            );
        } else {
            this.applyDefaultDiscriminatorStyle(
                layer,
                discriminator,
                discriminatorItems,
                defaultStyle
            );
        }
    },
};

export default GeojsonDiscriminatorUtil;
