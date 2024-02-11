import React ,{useState, useEffect}from 'react'
import "./ListOfUsers.styles.scss";
import {getAllUsers} from "../../../Api/users";
import Loading from '../../../components/Loading/Loading.component';
import Pagination from '@mui/material/Pagination';
import { useSearchParams } from "react-router-dom";

 
import UsersTableList from '../../../components/UsersTableList/UsersTableList.component';
 
function ListOfUsers() {

    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);
    let [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (event, value) => {
        setPage(value);
        const obj = {};
        const values = searchParams.entries()
        for (const [key, value] of values) {
            obj[key]=value;
        }
        obj["page"] = value;
        setSearchParams(obj);
    }


    useEffect(() => {
      setLoading(true);

      const search_page = searchParams.get("page");
      if(search_page) setPage(parseInt(search_page));
      else setPage(1);

        (async () => {
            try{
                const {data} = await getAllUsers(window.location.search);
                console.log(window.location.search);
                const {users} = data.data;
                setUsers(users);
            }catch(err){
                console.log("Err ========> ",err);
            }

            setLoading(false);
        })();

    },[page]);


    console.log(users);
    if(loading) return <Loading />

  return (
    <div className='list__of__users'>
      {/* <div className='filtering'>filtering...</div> */}
 
        <UsersTableList users={users}/>

        <div className='pagination'>
            
            <Pagination 
                page={page} 
                onChange={handleChange}
                count={10} 
                color="primary"
                />
        </div>    
    </div>
  )
}

export default ListOfUsers