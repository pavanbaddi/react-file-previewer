import React from "react";

export default function Thumbnail({ enabled, Thumbnails, children }) {
    
    if(!enabled){
        return children
    }

    return <div
        style={{
            border: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            height: '100%',
        }}
    >
        <div
            style={{
                borderRight: '1px solid rgba(0, 0, 0, 0.1)',
                width: '20%',
            }}
        >
            <Thumbnails />
        </div>
        <div
            style={{
                flex: 1,
                overflow: 'hidden',
            }}
        >
            {children}
        </div>
    </div>
}