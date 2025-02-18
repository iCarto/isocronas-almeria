import {createContext, useContext, useState} from "react";

const DirtyFormContext = createContext(null);

export default function FormDirtyProvider({children}) {
    const [isFormDirty, setIsFormDirty] = useState(false);

    const setDirty = dirty => {
        setIsFormDirty(dirty);
    };

    return (
        <DirtyFormContext.Provider value={{isFormDirty, setDirty}}>
            {children}
        </DirtyFormContext.Provider>
    );
}

function useFormDirtyContext() {
    return useContext(DirtyFormContext);
}

export {useFormDirtyContext};
