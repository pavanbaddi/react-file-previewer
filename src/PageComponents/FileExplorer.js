import React  from "react";
import "./FileExplorer.css";
import FileViewer from "../Components/FileViewer";

export default function FileExplorer({files, prevFile, prevChoosenFile}) {
    return files.length ? (
          <div className='file-viewer-container' >
            <div className='listing' >
                <h4>List of Selected Files</h4>
                <ul data-testid="listing" >
                  {files.map((file, index) => {
                    const {file : uploadedFile, url} = file;
                    const isActive = prevFile === file
                    return <li className={` ${isActive ? 'active' : ''} `} key={index} onClick={() => prevChoosenFile(file)} >
                      <p>{uploadedFile.name} (Click to View) </p>
                    </li>
                  } )}
                </ul>
            </div>

            <div className='viewer' >
                {
                  prevFile ? <FileViewer file={prevFile.file} url={prevFile.url} /> : null 
                }
            </div>
          </div>
    ) : null
    
}