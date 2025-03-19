import {createContext, useContext, useState} from "react";

let PoisIsochroneContext = createContext(null);

export default function PoisIsochroneProvider({children}) {
    const [selectedTravelTime, setSelectedTravelTime] = useState(null);
    const [selectedTransport, setSelectedTransport] = useState(null);
    const [isochrone, setIsochrone] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [elements, setElements] = useState(null);
    const [listElements, setListElements] = useState(null);

    const [selectedElement, setSelectedElement] = useState(null);

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
                listElements,
                setListElements,
                selectedElement,
                setSelectedElement,
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
