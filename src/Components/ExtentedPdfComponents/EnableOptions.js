import React  from "react";

export default function EnableOptions({features, setFeatures}) {

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
    ] 

    return <div>
            <div>
                <h4>Options</h4>
            </div>
            {
                Options.map((option, index)=>{
                    return option.render()
                })
            }
    </div>
}