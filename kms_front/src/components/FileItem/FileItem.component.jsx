import React ,{useState,Fragment,useEffect} from 'react'
import "./FileItem.styles.scss";
import axios from 'axios';

import WordIcon from "../../assets/docx_icon.svg";
import PdfIcon from "../../assets/PDF_file_icon.svg";
import PptIcon from "../../assets/ppt.svg";
import XlsIcon from "../../assets/xls.svg";

import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import LaunchIcon from '@mui/icons-material/Launch';
import {Link} from "react-router-dom";

function FileItem({file,openPdf}) {

    const {name,path} = file;
    const server__host = import.meta.env.VITE_SERVER_HOST;
console.log(server__host);
    const [open,setOpen] = useState(openPdf);

    useEffect(() => {
        setOpen(openPdf);
    },[openPdf]);

    const checkPdf = () => {
        const extention = name.slice(name.lastIndexOf(".") + 1);
        return extention === "pdf"
    }

    const getIcon = name => {
        // const ext = path.extname(name).toLowerCase();
        // console.log("********************* ",ext);

        const extention = name.slice(name.lastIndexOf(".") + 1);
        // console.log(extention);
        if(extention === "pdf") return PdfIcon;
        else if(extention === "docx") return WordIcon;
        else if(extention === "pptx") return PptIcon;
        else return XlsIcon;
    }

    function downloadFile() {
        const fileUrl = `${server__host}${path}`; // Replace with the actual file URL or API endpoint
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
        <div className='file__item'>

            <div className='info'>
                <img src={getIcon(name)} alt="icon"/>
                <p className='item__name'>{name}</p>

                <FileDownloadIcon className='icon' onClick={downloadFile}/>
                {checkPdf() && (
                <Fragment>
                    {
                        open ? 
                            <VisibilityIcon className='custom-icon' onClick={() => setOpen(!open)}/>  : 
                            <VisibilityOffIcon className='custom-icon' onClick={() => setOpen(!open)}/>
                    }
                    <Link to={`${server__host}${path}`}  target="_blank"><LaunchIcon className='icon'/></Link>
                </Fragment>
                
                )}
            </div>

            { checkPdf() && open && (<div className='pdf__preview'>
                <iframe src={`${server__host}${path}`}/>
            </div>)}
        </div>
  )
}

export default FileItem