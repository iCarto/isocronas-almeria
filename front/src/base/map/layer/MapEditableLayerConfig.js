export function useMapEditableLayerConfig({
    load,
    update,
    layer,
    legend = null,
    options = null,
}) {
    console.log("CARTO >> Creating editable layer config", {layer});

    return {
        load,
        update,
        layer,
        legend,
        options,
    };
}
