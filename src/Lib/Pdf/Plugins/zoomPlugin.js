import React from "react";

export default function zoomPlugin({store}) {
    return {
        install: (pluginFunctions) => {
            store.update("zoom", pluginFunctions.zoom)
        },
        zoomTo : (number) => {
            const zoom = store.get("zoom")
            if(zoom){
                zoom(number)
            }
        }
    }

}