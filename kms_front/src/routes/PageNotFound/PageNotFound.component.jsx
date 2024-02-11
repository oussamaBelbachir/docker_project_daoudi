import React from 'react'
import "./PageNotFound.styles.scss";
import NotFound404 from "../../assets/NotFound404.svg";

function PageNotFound() {
  return (
    <div className='pagenotfound'>
        <img src={NotFound404} alt={"pagenotfound"}/>
        <h3>Page non trouvée !</h3>
    </div>
  )
}

export default PageNotFound