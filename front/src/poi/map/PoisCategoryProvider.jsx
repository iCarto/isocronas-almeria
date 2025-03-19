import {useMapGeojsonLayerContext} from "base/map/layer/geojson";
import {useEffect} from "react";
import {usePoisIsochroneContext} from ".";

export default function PoisCategoryProvider({}) {
    const {
        layerConfig: {layer},
    } = useMapGeojsonLayerContext();

    const {selectedCategories, elements, setListElements, selectedElement} =
        usePoisIsochroneContext();

    useEffect(() => {
        if (elements) {
            let filteredElements = [];
            if (selectedCategories.length) {
                filteredElements = elements.filter(feature =>
                    selectedCategories.includes(feature.properties.category)
                );
            }
            setListElements(filteredElements);
            layer.setHighlightedIds(filteredElements.map(element => element.id));
            layer.reload();
        }
    }, [elements, selectedCategories]);

    useEffect(() => {
        layer.setSelectedId(selectedElement);
        layer.reload();
    }, [selectedElement]);

    return null;
}
