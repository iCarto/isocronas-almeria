import {createContext, useContext, useState} from "react";

let PoisIsochroneContext = createContext(null);

export default function PoisIsochroneProvider({children}) {
    const [selectedTravelTime, setSelectedTravelTime] = useState(null);
    const [selectedTransport, setSelectedTransport] = useState(null);
    const [isochrone, setIsochrone] = useState(null);

    return (
        <PoisIsochroneContext.Provider
            value={{
                selectedTravelTime,
                setSelectedTravelTime,
                selectedTransport,
                setSelectedTransport,
                isochrone,
                setIsochrone,
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
