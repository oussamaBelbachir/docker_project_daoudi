import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../../components/Header/Header.component';
import Sidebar from '../../components/Sidebar/Sidebar.component';
import "./MainLayout.styles.scss";

function MainLayout() {
  console.log("MainLayout !");
  return (
    <div className='mainlayout'>

      <Sidebar />

      <div className='mainlayout__right'>
          <Header />
          <div className='main__content'>
              <Outlet />
          </div>
      </div>

    </div>
  )
}

export default MainLayout