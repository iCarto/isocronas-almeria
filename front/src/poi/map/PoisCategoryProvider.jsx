import {useMapGeojsonLayerContext} from "base/map/layer/geojson";
import {useEffect} from "react";
import {usePoisIsochroneContext} from ".";

export default function PoisCategoryProvider({}) {
    const {
        layerConfig: {layer},
    } = useMapGeojsonLayerContext();

    const {selectedCategories, elements, setListElements} = usePoisIsochroneContext();

    useEffect(() => {
        if (elements) {
            if (selectedCategories.length) {
                const filteredElements = elements.filter(feature =>
                    selectedCategories.includes(feature.properties.category)
                );
                setListElements(filteredElements);
            } else {
                setListElements([]);
            }
            layer.reload();
        }
    }, [elements, selectedCategories]);

    return null;
}
