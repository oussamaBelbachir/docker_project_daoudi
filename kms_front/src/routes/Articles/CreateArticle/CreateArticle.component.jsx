import React ,{useState,useEffect} from 'react'
import "./CreateArticle.styles.scss";
import { useNavigate } from "react-router-dom";
import Button from '../../../components/Button/button.component';
import FormInput from '../../../components/FormInput/FormInput.component';
import Label from '../../../components/Label/Label.component';
import {createArticle} from "../../../Api/articles";
import { toast } from 'react-hot-toast';
import Editor from '../../../components/Editor2/Editor';
import TurndownService from "turndown";

import { useSelector } from 'react-redux';
import {selectCurrentUser} from "../../../store/user/user.selectors";

// import axios from 'axios';

function CreateArticle() {

    const {_id, direction_departments} = useSelector(selectCurrentUser);
    // const direction_departments = JSON.parse(import.meta.env.VITE_DIRECTION_DEPARTMENTS);

    
    const [direction,setDirection] = useState('');
    const [department,setDepartment] = useState("");
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    const [content,setContent] = useState("");
    const [loading,setLoading] = useState(false);
    const [image, setImage] = useState(null)
    const [file, setFile] = useState([])
    const [showImage, setShowImage] = useState(null)
    const [errors , setErrors] = useState({});
    
    const navigate = useNavigate();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            
            const file = event.target.files[0];
            // console.log(file);
            setImage(file);
            console.log("img ==> ",file);
            setShowImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onfileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const files = event.target.files;
            console.log("=====================================");
            // console.log(file);
            // console.log(file.name);
            console.log(files);
            console.log("=====================================");
        
            setFile(files);

        }
    }
    const getDepartmentsByDirection = () => {
        if(!direction) return [];
        return direction_departments[direction].map(dir => ({value : dir,text : dir}));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({});


        setLoading(true);
        console.log("*********** ",file);

        if(file.length > 10){
            setLoading(false);
            return toast.error("Vous avez dépassé le nombre maximum de fichiers ( 10 )");
        }

        const formData = new FormData();
        formData.append("author",_id);
        formData.append("direction",direction);
        formData.append("department",department);
        formData.append("description",description);
        formData.append("image",image);
        
        for (let i = 0; i < file.length; i++) {
            formData.append('files', file[i]);
          }

        formData.append("title",title);
        if(markdownContent){
            formData.append("content",markdownContent);
        }

         
        try{
            const res = await createArticle(formData);
            console.log(res);
            toast.success(res.data.message);
            navigate("/articles");

        }catch(err){
            console.log(err);
            const {data} = err.response;

            if(data.status === "fail"){
                toast.error(data.message);
            }else if(data.status === "error"){
                const {message , errors} = data;
                toast.error(`${message}`);
                console.error(errors);
                setErrors(errors);
            }

        }

        setLoading(false);

    }

    // console.log("description ",description);
    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(content);

//  console.log("**********************************");
//  console.log(content);
//  console.log(markdownContent);
//  console.log("**********************************");


  return (
    <div className='create__article'>
        <form onSubmit={handleSubmit}>


        {/* ========================================== */}
        
        <Label required>Image</Label>

        <div className='upload__image'>
            <label htmlFor="images" className="drop-container" id="dropcontainer">
                <input 
                    name="image" 
                    type="file" 
                    onChange={onImageChange} 
                    id="images" 
                    accept="image/jpeg, image/png"
                    required
                    encType="multipart/form-data"
                />
            </label>
            {/* ========================================== */}
            {showImage && (<div className='image__preview'><img src={showImage} alt={"preview"}/></div>)}
            {/* <img src={"http://localhost:8000/uploads/70b9766f85a696b5dd81a2adba3b19af"}/> */}
        </div>

     
        {/* <div className='upload__image'>
            <label htmlFor="images" className="drop-container" id="dropcontainer">
                <input 
                    name="files" 
                    type="file" 
                    onChange={onfileChange} 
                    id="images" 
                    accept="*" 
                    multiple
                    encType="multipart/form-data"
                />
            </label>
        </div> */}
        

            <FormInput 
                label={"Direction"}
                name='direction'
                required
                defaultOption="Veuillez choisir la direction "
                values={Object.keys(direction_departments).map(dir => ({value : dir,text : dir}))}
                value={direction}
                onChange={(e) => { setDirection(e.target.value)}}
            />

            <FormInput 
                label={"Département"}
                name='department'
                required
                defaultOption="Veuillez choisir le département "
                values={getDepartmentsByDirection()}
                value={department}
                onChange={(e) => { setDepartment(e.target.value)}}
            />

            <FormInput 
                label={"Titre"}
                placeholder=""
                type='text'
                name='title'
                error={errors["title"]}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />    

            <FormInput 
                label={"Description"}
                placeholder=""
                type='text'
                error={errors["description"]}
                name='description'
                textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />    

            <div>
                <Label>Contenu</Label>
 
                <Editor
                    value={content}
                    setValue={(v) => setContent(v)}
                />
            </div>


            <div className='files__input'>
                
                <Label >Fichiers</Label>
                {/* <input type="file" name="files" multiple onChange={onfileChange} /> */}
               
                <label className="drop-container" id="dropcontainer">
                    <input 
                        name="files" 
                        type="file" 
                        onChange={onfileChange} 
                        encType="multipart/form-data"
                        multiple
                        accept="
                        application/pdf,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                        application/vnd.openxmlformats-officedocument.presentationml.presentation,
                        application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    />
                </label>
            </div>



            <Button width={200} loading={loading}>Ajouter</Button>
        </form>

{/* <iframe src='http://localhost:8000/uploads/2023-08-02T10:20:47.711ZClasseur1.xlsx'/> */}


{/* <div className='files'>
<iframe src='http://localhost:8000/uploads/2023-08-02T09:27:10.158Zlettre1.pdf'/>
<iframe src='http://localhost:8000/uploads/2023-08-02T10:59:59.626ZAffiche-SAS-Export-WEB.pdf'/>
<embed src="http://localhost:8000/uploads/2023-08-02T10:59:59.626ZAffiche-SAS-Export-WEB.pdf" width="800" height="500" type='application/pdf' />


<object data="http://localhost:8000/uploads/2023-08-02T10:59:59.626ZAffiche-SAS-Export-WEB.pdf" type="application/pdf" width="800" height="500">
  <p>It appears you don't have a PDF viewer for this browser.
  No biggie... you can <a href="path/to/your.pdf">click here to
  download the PDF file.</a></p>
</object>
</div> */}

        {/* <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} /> */}

        {/* <Document file={"http://localhost:8000/uploads/1676570ab7121d4ccff6213bf5e1fd2e0.pdf"}>
            <Page pageNumber={1} />
        </Document> */}


        {/* <div>
        <h1>React Quill Editor with full toolbar options and custom buttons (undo &amp; redo)</h1><p><a href="https://medium.com/@mircea.calugaru?source=post_page-----176d79f8d375--------------------------------" rel="noopener noreferrer" target="_blank" style={{color: 'inherit', backgroundColor: 'rgb(242, 242, 242)'}}><img src="https://miro.medium.com/v2/resize:fill:88:88/2*4diGcLLBnOuZ8XJ8yfePiQ.png" /></a></p><p><a href="https://medium.com/@mircea.calugaru?source=post_page-----176d79f8d375--------------------------------" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}>Mike Calugaru</a></p><p><br /></p><p><br /></p><p><a href="https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D176d79f8d375&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40mircea.calugaru%2Freact-quill-editor-with-full-toolbar-options-and-custom-buttons-undo-redo-176d79f8d375&source=-----176d79f8d375---------------------post_audio_button-----------" rel="noopener noreferrer" target="_blank" style={{color: 'inherit', backgroundColor: 'rgb(255, 255, 255)'}}><img src="https://miro.medium.com/v2/resize:fit:1400/1*Orexv5GDZPk8a8ejXyptVQ.png" /></a></p><p><a href="https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D176d79f8d375&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40mircea.calugaru%2Freact-quill-editor-with-full-toolbar-options-and-custom-buttons-undo-redo-176d79f8d375&source=-----176d79f8d375---------------------post_audio_button-----------" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}>This article shows one way to set up&nbsp;</a><a href="https://quilljs.com/" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}><em>Quill</em></a>&nbsp;editor within the React framework with the full spectrum of standard toolbar options as well as 2 extra common but custom buttons: Undo and Redo.</p><p><strong>Quick backstory:</strong>&nbsp;some time ago I was looking for a free&nbsp;<a href="https://en.wikipedia.org/wiki/WYSIWYG" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}><em>WYSIWYG web editor</em></a>to integrate it in my React app. I decided to stop on Quill (though there are loads more free editors out there) and was searching for examples on how to set it up with a custom toolbar and make it work as a React component. The best and almost working example that I could find was&nbsp;<a href="https://codesandbox.io/s/6x93pk4rp3?file=%2Findex.js" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}>https://codesandbox.io/s/6x93pk4rp3?file=/index.js</a>&nbsp;from&nbsp;<a href="https://codesandbox.io/u/miukimiu" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}><em>Elizabet Oliveira</em></a>back in 2018. This article builds on top of Elizabet’s example with the extra of bug fixes, up-to-date React hooks, custom Redo and Undo buttons, as well as a display of all of Quill’s standard toolbar options (that I could find). It was a bit of a hassle to make all the elements to work properly (without any errors and warnings), so hopefully this will save you off from some possible pain. Enjoy!</p><p>CodeSandBox:&nbsp;<a href="https://codesandbox.io/s/react-quill-full-toolbar-j569z" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}>https://codesandbox.io/s/react-quill-full-toolbar-j569z</a></p><p>Live demo:&nbsp;<a href="https://j569z.csb.app/" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}>https://j569z.csb.app/</a></p><p>I would recommend that you split the code into 2 files:&nbsp;<em>EditorToolbar.js —&nbsp;</em>keep the toolbar component and associated stuff, and&nbsp;<em>Editor.js —&nbsp;</em>the editor component.</p><p><em>EditorToolbar.js</em></p>
      </div> */}

      {/* <div>{content}</div>

    <div>{markdownContent}</div> */}

 
{/* <hr/>
<hr/>
<hr/>
<hr/>
<hr/> */}
      {/* <ReactMarkdown children={markdownContent} remarkPlugins={[remarkGfm]} /> */}
    </div>
  )
}

export default CreateArticle