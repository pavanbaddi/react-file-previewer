import React, {useState} from 'react';
import './App.css';
import FileExplorer from './PageComponents/FileExplorer';

function App() {

  const [files, setFiles] = useState([])
  const [prevFile, setPrevFile] = useState(null)

  const onHandleFileChanges = ( event ) => {
    const element = event.target
    const tempFiles = []
    
    if(element.files.length){
      for(let file of element.files){
        tempFiles.push({file, url: URL.createObjectURL(file)})
      }
    }
    setFiles(tempFiles)
    element.value = "";
  }

  const prevChoosenFile = (file) => {
    setPrevFile(file)
  }


  return (
    <div>
      <div className='form-container' >
        <div>
          <label>File Uploader</label>
        </div>
        <input data-testid="file-input" type='file' onChange={onHandleFileChanges} multiple/>
      </div>


      <FileExplorer files={files} prevFile={prevFile} prevChoosenFile={prevChoosenFile} />

    </div>
  );
}

export default App;
