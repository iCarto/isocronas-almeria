import {createContext, useContext, useEffect, useState} from "react";
import {useMapGeojsonLayerContext} from ".";

let MapGeojsonLayerDiscriminatorContext = createContext(null);

export default function MapGeojsonLayerDiscriminatorProvider({children}) {
    const {
        layerConfig: {layer, discriminators},
    } = useMapGeojsonLayerContext();

    const [selectedDiscriminator, setSelectedDiscriminator] = useState(null);

    const [checkedDiscriminatorItems, setCheckedDiscriminatorItems] = useState([]);

    useEffect(() => {
        if (discriminators && discriminators.length && !selectedDiscriminator) {
            setSelectedDiscriminator(discriminators[0]);
        }
    }, []);

    useEffect(() => {
        if (selectedDiscriminator) {
            console.log("CARTO >> Changing layer discriminator", {
                selectedDiscriminator,
            });
            layer.setDiscriminator(selectedDiscriminator);
            if (selectedDiscriminator) {
                const defaultCheckedItems = selectedDiscriminator.entries.map(
                    discriminatorItem => discriminatorItem.code
                );
                setCheckedDiscriminatorItems(defaultCheckedItems);
            }
        }
    }, [selectedDiscriminator]);

    useEffect(() => {
        console.log("CARTO >> Changing discriminator items visibility", {
            checkedDiscriminatorItems,
        });
        layer.setDiscriminatorItems(checkedDiscriminatorItems);
    }, [checkedDiscriminatorItems]);

    const setCheckedDiscriminatorItem = (itemCode, checked) => {
        console.log("CARTO >> Changing discriminator item", {itemCode}, {checked});
        if (checked) {
            setCheckedDiscriminatorItems([...checkedDiscriminatorItems, itemCode]);
        } else {
            setCheckedDiscriminatorItems(
                checkedDiscriminatorItems.filter(itemCodeAux => itemCodeAux != itemCode)
            );
        }
    };

    return (
        <MapGeojsonLayerDiscriminatorContext.Provider
            value={{
                discriminators,
                selectedDiscriminator,
                setSelectedDiscriminator,
                checkedDiscriminatorItems,
                setCheckedDiscriminatorItem,
            }}
        >
            {children}
        </MapGeojsonLayerDiscriminatorContext.Provider>
    );
}

const useMapLayerDiscriminatorContext = () => {
    return useContext(MapGeojsonLayerDiscriminatorContext);
};

export {useMapLayerDiscriminatorContext};
