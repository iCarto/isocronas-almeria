import {createContext, useContext, useEffect, useState} from "react";

let PoisIsochroneContext = createContext(null);

export default function PoisIsochroneProvider({children}) {
    const [selectedTravelTime, setSelectedTravelTime] = useState(null);
    const [selectedTransport, setSelectedTransport] = useState(null);
    const [isochrone, setIsochrone] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [elements, setElements] = useState(null);
    const [filteredElements, setFilteredElements] = useState(null);

    useEffect(() => {
        if (elements) {
            if (selectedCategories.length) {
                const filteredElements = elements.features.filter(feature =>
                    selectedCategories.includes(feature.properties.category)
                );
                setFilteredElements(filteredElements);
            } else {
                setFilteredElements([]);
            }
        }
    }, [selectedCategories]);

    return (
        <PoisIsochroneContext.Provider
            value={{
                selectedTravelTime,
                setSelectedTravelTime,
                selectedTransport,
                setSelectedTransport,
                isochrone,
                setIsochrone,
                selectedCategories,
                setSelectedCategories,
                elements,
                setElements,
                filteredElements,
            }}
        >
            {children}
        </PoisIsochroneContext.Provider>
    );
}

const usePoisIsochroneContext = () => {
    return useContext(PoisIsochroneContext);
};

export {usePoisIsochroneContext};
