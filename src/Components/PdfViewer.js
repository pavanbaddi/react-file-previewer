import React, { useState, useEffect, useCallback, useContext } from "react";
import { MinimalButton, Position, RotateDirection, Tooltip, Viewer, Worker, SpecialZoomLevel  } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


import { RotateBackwardIcon, RotateForwardIcon } from '@react-pdf-viewer/rotate';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { getFilePlugin } from '@react-pdf-viewer/get-file';

import Thumbnail from "./ExtentedPdfComponents/Thumbnail";
import EnableOptions from "./ExtentedPdfComponents/EnableOptions";
import DownloadButton from "./ExtentedPdfComponents/DownloadButton";

import readingProgress from "../Lib/Pdf/Plugins/readingProgess";
import { PdfContext } from "../Contexts/PdfContext";
import getZoomPlugin from "../Lib/Pdf/Plugins/zoomPlugin";

const pdfVersion = "3.11.174"
const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`

const TOOLTIP_OFFSET = { left: 0, top: 8 };

export default function PdfViewer({ url }) {
    const {getStore} = useContext(PdfContext)
    const store = getStore()

    const readingProgressPluginInstance = readingProgress({store})
    const { renderToolbar } = readingProgressPluginInstance;
    
    const getFilePluginInstance = getFilePlugin();
    const thumbnailPluginInstance = thumbnailPlugin();
    const zoomPlugin = getZoomPlugin({store});
    
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar
    });
    const { Thumbnails } = thumbnailPluginInstance;

    const [plugins, setPlugins] = useState([])

    const [features, setFeatures] = useState({
        "enable_rotation": false,
        "enable_thumbnail": false,
        "enable_default_layout": true,
        "enable_download": true,
        "enable_print": false,
        "enable_reading_progress": true,
        "enable_zoom_level" : true,
        "zoom_level_config" : {
            "zoomLevel" : SpecialZoomLevel.ActualSize
        }
    });

    useEffect(() => {
        initPlugins();
    }, [features])

    const initPlugins = useCallback(() => {
        const tempPlugins = []

        if (features.enable_thumbnail) {
            tempPlugins.push(thumbnailPluginInstance)
        }

        if (features.enable_default_layout) {
            tempPlugins.push(defaultLayoutPluginInstance)
        }

        if (features.enable_reading_progress) {
            tempPlugins.push(readingProgressPluginInstance)
        }

        if (features.enable_download) {
            tempPlugins.push(getFilePluginInstance)
        }

        if (features.enable_zoom_level) {
            tempPlugins.push(zoomPlugin)
        }

        setPlugins(tempPlugins)

    }, [features])

    const initialZoomLevel = useCallback(() => {
        let val = 1

        if(features.enable_zoom_level && features.zoom_level_config.zoomLevel){ 
            val = features.zoom_level_config.zoomLevel
        }
        return val;
    },[])

    const renderPage = (props) => {

        if (!features.enable_rotation) {
            return props.canvasLayer.children
        }

        return <>
            {props.canvasLayer.children}

            <div style={{
                padding: '0.25rem',
                position: 'absolute',
                right: 0,
                top: 0,
                transform: 'translate(100%, 0)',
                zIndex: 1,
            }} >

                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '0 auto',
                    }}
                >
                    <Tooltip
                        position={Position.BottomCenter}
                        target={
                            <MinimalButton onClick={() => props.onRotatePage(RotateDirection.Forward)}>
                                <RotateForwardIcon />
                            </MinimalButton>
                        }
                        content={() => 'Rotate clockwise'}
                        offset={TOOLTIP_OFFSET}
                    />
                    <Tooltip
                        position={Position.BottomCenter}
                        target={
                            <MinimalButton onClick={() => props.onRotatePage(RotateDirection.Backward)}>
                                <RotateBackwardIcon />
                            </MinimalButton>
                        }
                        content={() => 'Rotate counterclockwise'}
                        offset={TOOLTIP_OFFSET}
                    />
                </div>

            </div>
        </>
    }

    const defaultScale = initialZoomLevel()

    return <>
        <EnableOptions zoomPlugin={zoomPlugin} features={features} setFeatures={setFeatures} />

        <DownloadButton enabled={features.enable_download} pluginInstance={getFilePluginInstance} />

        <Thumbnail enabled={features.enable_thumbnail} Thumbnails={Thumbnails} >
            <Worker workerUrl={pdfWorkerUrl} >
                <Viewer
                    defaultScale={defaultScale}
                    plugins={plugins}
                    renderPage={renderPage}
                    fileUrl={url}
                    renderError={(error) => {
                        console.log("PdfViewer renderError", { error, url })
                    }}
                />
            </Worker>
        </Thumbnail>
    </>
}