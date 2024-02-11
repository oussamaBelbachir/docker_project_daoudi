import React ,{useState}from 'react'
import "./SubMenu.styles.scss";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NavLink} from "react-router-dom";
import { useLocation } from 'react-router-dom'

function SubMenu({item}) {

    const [open,setOpen] = useState(false);
    const {title,submenu} = item;
    const  {pathname}  = useLocation();
    let path = pathname.split("/");
    path.shift();

    path = path.length > 1 && path[1] == title;


  return (
    <div className={`submenu ${(open || path) ? "open" : "" }`}>

        <div onClick={() => setOpen(!open)} className='submenu__title flex-between'>
            <div className='left'>
                {/* <AddIcon /> */}
                <span>{title}</span>
            </div>
            <div className='chevronRightIcon right'>
                <ChevronRightIcon />
            </div>
        </div>

        <div className='submenu__items'>
            {
                submenu.map(item => (
                    <div key={item.title} className='item flex-center'> <NavLink to={`/articles/${title}/${item.title}`}>{item.title}</NavLink></div>
                ))
            }
        </div>
    </div>
  )
}

export default SubMenu