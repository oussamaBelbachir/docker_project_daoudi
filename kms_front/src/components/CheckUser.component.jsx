import React,{ useEffect ,useState} from 'react';
import { useDispatch} from 'react-redux';
import { setCurrentUser } from '../store/user/user.actions';
import {checkUser} from "../Api/auth";
import Loading from './Loading/Loading.component';

const CheckUser = (OriginalComponent) => {

    function NewComponent(props) {
      
      const [loading,setLoading] = useState(true);
      const dispatch = useDispatch();
  
      useEffect(() => {
          (async () => {
            console.log("check user");
            try{
                // const {data : {data}} = await checkUser();
                const res = await checkUser();
                const {user} = res.data.data;
                console.log("yes");
                dispatch(setCurrentUser(user));

            }catch(err){
              console.log("no");
              console.log("Auth Err ====> ",err);
            }

            setLoading(false);

          })();
        },[]);
  
    // console.log("App user ==> ",user);
      
    if(loading){
        return <div className="app"><Loading full/></div>
      }

      return <OriginalComponent />;
    }
    return NewComponent;
}


export default CheckUser;