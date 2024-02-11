import React from 'react'
import "./Loading.styles.scss";
import LoadingLogo from "../../assets/loading__logo.png";
// import DotLoader from "react-spinners/DotLoader";


function Loading({full}) {
  return (
    <div className={`loading__page ${full ? "full" : ""}`}>

            <img className='loading__logo' src={LoadingLogo}/>
            {/* <DotLoader 
                className='spinner'
                size={75}
                color={"red"}
            /> */}
    </div>
  )
}

export default Loading