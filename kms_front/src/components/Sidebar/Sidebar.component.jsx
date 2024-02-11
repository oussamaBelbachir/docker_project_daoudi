import React from 'react'
import SubMenu from '../SubMenu/SubMenu.component';
import "./Sidebar.styles.scss";
import Logo from "../Logo/Logo.component";
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import {selectCurrentUser} from "../../store/user/user.selectors";
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import {logout} from "../../Api/auth";

import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/user/user.actions';
import adminRoutes from "./adminRoutes";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Sidebar() {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = useSelector(selectCurrentUser);

  const direction_departments = user.role !== "admin" ? user.direction_departments : JSON.parse(import.meta.env.VITE_DIRECTION_DEPARTMENTS);
  // const direction_departments = user ? user.direction_departments : JSON.parse(import.meta.env.VITE_DIRECTION_DEPARTMENTS);

  const menuItems = Object.keys(direction_departments).map(el => {

  const submenu = direction_departments[el].map(dep => ({title : dep,url : "/"+dep}));
    return {
        title : el,
        url : "/"+el,
        submenu
    }
  });

  const handleLogout  = async  () => {
    await logout();
    dispatch(setCurrentUser(null));
    navigate("/connexion");
  }

  return (
    <div className='sidebar'>
      <div>
        <div className='sidebar__logo'>
          <Link to={"/articles"}><Logo /></Link>
        </div>
        {
          user.role === "admin" && (
          <div className='admin__sidebar'>
            {
              adminRoutes.map(el => (
                <div key={el.name} className='sidebar__item'>
                    <Link to={el.link} className='flex-center'>
                      <span>< el.icon className='custom-icon'/></span>
                      <span>{el.name}</span>
                    </Link>
                </div>))
            }


          </div>
          )
        }

        <div className='sidebar__menu'>
            {
              menuItems.map(item => <SubMenu key={item.title} item={item}/>)
            }
        </div>

        <div className='sidebar__item'>
            <Link to={"/profil"} className='flex-center'>
              <span><AccountCircleIcon className='custom-icon'/></span>
              <span>Profil</span>
            </Link>
        </div>

      </div>


        <div className='logout' onClick={handleLogout}><LogoutIcon />deconnexion</div>
    </div>
  )
}

export default Sidebar