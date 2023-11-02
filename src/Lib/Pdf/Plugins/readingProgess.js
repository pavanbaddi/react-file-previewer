import React from "react";
import { createStore, Plugin, PluginFunctions } from '@react-pdf-viewer/core';
import ReadingProgress from "../../../Components/ExtentedPdfComponents/ReadingProgress";

export default function readingProgress({store}) {

    return {
        install: (pluginFunctions) => {
            store.update("getPagesContainer", pluginFunctions.getPagesContainer)
        },
        renderToolbar: (Component) => {
            return <ReadingProgress  store={store} >
                <Component />
            </ReadingProgress>
        }
    }

}