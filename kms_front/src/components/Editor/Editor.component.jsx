import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";


export const Editor = ({value,setValue}) => {
//   const [state, setState] = React.useState({ value: null });
//   const handleChange = value => {
//     setState({ value });
//   };
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(value) => setValue(value)}
        placeholder={"Veuillez saisir le contenu..."}
        modules={modules}
        formats={formats}
      />

      <hr/>

      <div>{value}</div>
    </div>
  );
};

export default Editor;
