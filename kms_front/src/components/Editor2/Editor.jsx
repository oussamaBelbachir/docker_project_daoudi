import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";

function Editor({value,setValue}) {

    // const [value,setValue] = useState("");
  return (
    <div className="form-group col-md-12 editor">
    <EditorToolbar toolbarId={'t1'}/>
    <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder={"Veuillez saisir le contenu..."}
        modules={modules('t1')}
        formats={formats}
    />
    </div>
  )
}

export default Editor