export function useMapLayerConfig({
    load,
    layer,
    legend,
    discriminators = [],
    onSelectedItem = null,
    options = null,
}) {
    console.log("CARTO >> Creating layer config", {layer});

    return {
        load,
        layer,
        legend,
        discriminators,
        onSelectedItem,
        options,
    };
}
