import React ,{useState} from 'react'
import FileItem from '../FileItem/FileItem.component';
import "./Files.styles.scss";
import Switch from '@mui/material/Switch';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DownloadIcon from '@mui/icons-material/Download';
import axios from "axios";


function Files({files}) {

  console.log("Files : " ,files);
  const server__host = import.meta.env.VITE_SERVER_HOST;

  if(!files || files.length === 0) return null;

    const [check,setcheck] = useState(false);
 
    function downloadFile({path,name}) {
      const fileUrl = `${server__host}${path}`; // Replace with the actual file URL or API endpoint
      console.log(fileUrl);
      axios.get(fileUrl, { responseType: 'blob' })
        .then((response) => {
          // Create a temporary URL for the downloaded file
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', name); // Replace 'filename.pdf' with the desired filename
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error('Error downloading file:', error);
        });
    }


  return (
    <div className='article__files'>
        <div className='show__files__download flex-between'>

          <div onClick={() => setcheck(!check)} className='flex-center pdf__preview__button'>
            {check ? <VisibilityIcon className='custom-icon'/>  : <VisibilityOffIcon className='custom-icon'/>}
            <div>Afficher un aperçu des documents PDF</div>
            <Switch  checked={check}/>
          </div>

          <div 
            className='flex-center download__all' 
            onClick={() => files.forEach((downloadFile))}
          >Download All <DownloadIcon className='custom-icon'/>
          </div>
        
        </div>

        <div className='files__list'>
            {
                files.map((file) => <FileItem openPdf={check} key={file.name} file={file}/>)
            }
        </div>
    </div>
  )
}

export default Files



