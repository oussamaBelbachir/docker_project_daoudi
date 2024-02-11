import "./Button.styles.scss";
import ClipLoader from "react-spinners/ClipLoader";

function Button({width,fitContent,nomargin,noheight,children,loading,...otherProps}) {
    return (
  
      <button
      style={{width: `${width}px`}}
      className={`custom-button ${loading ? "loading" : ""}  ${nomargin ? "nomargin" : ""}  ${noheight ? "noheight" : ""} ${fitContent ? "fitContent" : ""}
      `} {...otherProps}
      >

        {loading ? (<ClipLoader color="#fff" size={20}/>) :
         (<>{children}</>)}
        
      </button>
    )
  }
  
  export default Button