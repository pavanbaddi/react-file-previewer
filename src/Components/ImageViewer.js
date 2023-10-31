import React  from "react";

export default function ImageViewer({ url, className }) {
    return <img src={url} className={className} />
}