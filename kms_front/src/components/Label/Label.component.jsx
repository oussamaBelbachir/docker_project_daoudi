import React from 'react'
import "./Label.styles.scss";

function Label({children,required,nomargin}) {
  return (
    <label className={`custom-label ${nomargin && "nomargin"}`}>{children} <span>{required ? "*" : ""}</span></label>
  )
}

export default Label