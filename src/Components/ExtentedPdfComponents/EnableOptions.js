import React  from "react";
import ZoomLevelFields from "./ZoomLevelFields";

export default function EnableOptions({zoomPlugin, features, setFeatures}) {

    const Options = [
        {
            "title" : "Enable Thumbnail",
            "render" : () => {
                return <button type="button" onClick={() => setFeatures({...features, enable_thumbnail: !features.enable_thumbnail})} > {features.enable_thumbnail ? `Disable`: `Enable`} Thumbnail</button>
            }   
        },
        {
            "title" : "Enable Rotation",
            "render" : () => {
                return <button type="button" onClick={() => setFeatures({...features, enable_rotation: !features.enable_rotation})} > {features.enable_rotation ? `Disable`: `Enable`} Rotation</button>
            }   
        },
        {
            "title" : "Enable Default Layout",
            "render" : () => {
                const keyName = "enable_default_layout"
                return <button type="button" onClick={() => setFeatures({...features, [keyName]: !features[keyName]})} > {features[keyName] ? `Disable`: `Enable`} Default Layout</button>
            }   
        },
        {
            "title" : "Enable Reading Progress",
            "render" : () => {
                const keyName = "enable_reading_progress"
                return <button type="button" onClick={() => setFeatures({...features, [keyName]: !features[keyName]})} > {features[keyName] ? `Disable`: `Enable`} Reading Progress</button>
            }   
        },
        {
            "title" : "Enable Download",
            "render" : () => {
                const keyName = "enable_download"
                return <button type="button" onClick={() => setFeatures({...features, [keyName]: !features[keyName]})} > {features[keyName] ? `Disable`: `Enable`} Download</button>
            }   
        },
        {
            "title" : "Enable Zoom Level",
            "render" : () => {
                const keyName = "enable_zoom_level"
                const isEnabled = features[keyName]
                return (
                    <>
                        <button type="button" onClick={() => setFeatures({...features, [keyName]: !features[keyName]})} > {features[keyName] ? `Disable`: `Enable`} Zoom Level</button>
                        {
                            isEnabled ? <ZoomLevelFields initial={features.zoom_level_config.zoomLevel} onChange={(val) => {
                                if(!isNaN(val)){
                                    val = Number(val)
                                }
                                setFeatures({...features, zoom_level_config: {...features.zoom_level_config, zoomLevel:val}})
                                zoomPlugin.zoomTo(val);
                            } } /> : null
                        }
                    </>
                )
            }   
        },
    ] 

    return <div>
            <div>
                <h4>Options</h4>
            </div>
            {
                Options.map((option, index)=>{
                    return <React.Fragment key={index} >
                        {option.render()}
                    </React.Fragment>
                })
            }
    </div>
}