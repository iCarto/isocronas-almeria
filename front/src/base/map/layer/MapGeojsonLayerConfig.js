export function useMapGeojsonLayerConfig({
    load,
    update = null,
    layer,
    legend,
    list = null,
    discriminators = [],
    onSelectedItem = null,
    options = null,
}) {
    console.log("CARTO >> Creating layer config", {layer});

    return {
        load,
        update,
        layer,
        legend,
        list,
        discriminators,
        onSelectedItem,
        options,
    };
}
