import React  from "react";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const pdfVersion = "3.11.174"
const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`

export default function PdfViewer({ url }) {
    return <Worker workerUrl={pdfWorkerUrl} >
        <Viewer fileUrl={url} renderError={(error) => {
            console.log("PdfViewer renderError", {error, url})
        }} />
    </Worker>
}