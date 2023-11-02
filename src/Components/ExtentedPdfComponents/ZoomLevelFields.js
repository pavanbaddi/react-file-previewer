import React from "react";

export default function ZoomLevelFields({initial, onChange}) {
    return <div>
        <h5>Zoom Options</h5>
        <select onChange={(e) => onChange(e.target.value)} value={initial} >
            <option value="ActualSize" >Actual Size</option>
            <option value="PageFit" >Page Fit</option>
            <option value="PageWidth" >Page Width</option>
            <option value="0.5" >50%</option>
            <option value="1" >100%</option>
            <option value="2" >200%</option>
        </select>
    </div>;
}
;