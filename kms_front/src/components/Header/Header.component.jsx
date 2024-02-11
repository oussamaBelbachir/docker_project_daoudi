import React ,{Fragment,useState}from 'react'
import "./Header.styles.scss";
import Avatar from '@mui/material/Avatar';

import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from "react-router-dom";
import Button from '../Button/Button.component';
import AddIcon from '@mui/icons-material/Add';

import { useSelector } from 'react-redux';
import {selectCurrentUser} from "../../store/user/user.selectors";

function Header() {

  const navigate = useNavigate();
  const [search,setSearch] = useState("");

  const {first_name,last_name,role} = useSelector(selectCurrentUser);

  const handleSubmit = e => {
    e.preventDefault();
    if(search) navigate(`/articles?search=${search}`);
  }

  return (
    <Fragment>
      <div className='header__height'></div>
      <div className='header flex-between'>
        <div>
          {role !== "reader" && (<Link to={"/articles/ajouter"}><Button nomargin fitContent><AddIcon />Ajouter un article</Button></Link>)}
        
        </div>
        
        {/* <Link to={"/articles"}><Logo /></Link> */}

          <div className='user flex-between'>
            <div className='search'>
                <form onSubmit={handleSubmit}>
                  <div className='search__group'>
                    <SearchIcon />
                    <input 
                      value={search}
                      onChange={e => setSearch(e.target.value.toLocaleLowerCase())}
                      placeholder='Tapez pour rechercher ...'
                    />
                  </div>
                </form>
            </div>

<Link to={"/users"}>
            <div className='avatar'>
                <Avatar alt="Oussama belbachir" src="https://cdn.sanity.io/images/gkcbanss/production/aa05e9269c07d593259360a2c9480507b5dea65c-1000x667.jpg?rect=2,0,997,667&w=768&h=514&auto=format" />
                <div>
                    <span className='full__name'>{first_name} {last_name}</span>
                    <span className='role'>{role === "admin" ? "admin" : role === "editor" ? "éditeur" : "lecteur"}</span>
                </div>
                
            </div>
</Link>

          </div>
      </div>
    </Fragment>
  )
}

export default Header