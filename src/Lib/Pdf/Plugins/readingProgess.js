import React from "react";
import { createStore, Plugin, PluginFunctions } from '@react-pdf-viewer/core';
import ReadingProgress from "../../../Components/ExtentedPdfComponents/ReadingProgress";

export default function readingProgress() {
    const store = createStore({})

    const ReadingProgressComponent = () => <ReadingProgress store={store} />

    return {
        install: (pluginFunctions) => {
            store.update("getPagesContainer", pluginFunctions.getPagesContainer)
        },
        ReadingIndicator: ReadingProgressComponent
    }
}