import React from "react";
import { getFilePlugin } from '@react-pdf-viewer/get-file';


export default function DownloadButton({enabled=false, pluginInstance}) {
    const { Download } = pluginInstance;


    return ( enabled ? <Download>
        {(props) => (
            <button
                style={{
                    backgroundColor: '#357edd',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    padding: '8px',
                }}
                onClick={props.onClick}
            >
                Download
            </button>
        )}
    </Download> : null);
};  
