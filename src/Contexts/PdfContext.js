import React, {useMemo} from "react";
import { createStore, Plugin, PluginFunctions } from '@react-pdf-viewer/core';

export const PdfContext = React.createContext(null)

export default function PdfContextProvider({children}) {

    const store =  useMemo(() => createStore({}))

    const getStore = () => store;

    return <PdfContext.Provider value={{
        getStore
    }} >
        {children}
    </PdfContext.Provider>;
}
