import React from 'react'
import "./Logo.styles.scss";
import LogoImg from "../../assets/logo.png";

function Logo({center}) {
    // small meduim large
  return (
    <div className={`custom__logo ${center && "center"}`}>
        <img src={LogoImg} alt="logo" />
    </div>
  )
}

export default Logo