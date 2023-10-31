import React  from "react";
import PdfViewer from "./PdfViewer";
import ImageViewer from "./ImageViewer";

export default function FileViewer({file, url, className}) {

    const getType = (  ) => {
        const type = file.type
        return {
            isPdf : type === 'application/pdf', 
            isImage : type.search(/image/) !== -1, 
        } 
    } 

    const type = getType()
    
    if(type.isPdf){
        return <PdfViewer url={url} />
    } else if(type.isImage ){
        return <ImageViewer url={url} className={className} />
    }
    
    return null 
}