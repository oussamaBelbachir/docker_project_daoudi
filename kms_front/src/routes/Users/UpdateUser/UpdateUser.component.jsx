import React ,{useEffect, useState}from 'react'
import "./UpdateUser.styles.scss";
import { useParams } from 'react-router-dom';
import {getUserById, updateUserById} from "../../../Api/users";
import Loading from "../../../components/Loading/Loading.component";
import toast from 'react-hot-toast';
import FormInput from '../../../components/FormInput/FormInput.component';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Label from '../../../components/Label/Label.component';
import Button from '../../../components/Button/button.component';
import { useNavigate } from "react-router-dom";


function UpdateUser() {
    const navigate = useNavigate();
    let {id} = useParams();

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [btnLoading,setBtnLoading] = useState(false);
    const [errors , setErrors] = useState({});
    const [formFields, setFormFields] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        direction_departments: {},
        active : false
    });

    useEffect(() => {
        (async () => {
            try{
                const res = await getUserById(id);
                setLoading(false);
                setUser(res.data.data.user);
            }catch(err){
                toast.error("Error");
                console.error("Err ==> ",err);
            }
        })();
    },[id]);

    useEffect(() => {
        if (user) {
            setFormFields({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                direction_departments: user.direction_departments,
                active : user.active
            });
        }
    }, [user]);

    if(loading){
        return <Loading />
    }
    if(!user){
        return "No User Found"
    }

    const {first_name, last_name, email, role, direction_departments,active} = formFields;
    const handleChange = ({target :{name,value}}) => {
        console.log(name,value);
        setFormFields({...formFields,[name]:value});
    }

    // console.log(first_name);
    // console.log(last_name);
    // console.log(user);

    
    const handleSubmit = async e => {
        e.preventDefault();
        console.log(formFields);
        setBtnLoading(true);

        try{
            const res = await updateUserById(user._id,formFields);
            console.log(res);
            toast.success(res.data.message);
            navigate("/users");
        }catch(err){
            console.log(err);
            const {data} = err.response;
            const {message , errors} = data;
            toast.error(`${message}`);
            console.error(errors);
            setErrors(errors);
        }

        setBtnLoading(false);

    }
  return (
    
    <div className='update__user'>

        <form onSubmit={handleSubmit}>
            <div className='flex-center full'>
                <FormInput 
                    label={"Nom"}
                    placeholder=""
                    type='text'
                    disabled
                    name='last_name'
                    error={errors["last_name"]}
                    required
                    value={last_name}
                    onChange={handleChange}
                />    
                <FormInput 
                    label={"Prénom"}
                    placeholder=""
                    disabled
                    type='text'
                    name='first_name'
                    error={errors["first_name"]}
                    required
                    value={first_name}
                    onChange={handleChange}
                />    
            </div>

                <FormInput 
                    label={"Email"}
                    placeholder=""
                    type='text'
                    disabled
                    name='email'
                    error={errors["email"]}
                    required
                    value={email}
                    onChange={handleChange}
                />   

                <div className='role'>
                    <FormInput 
                        label={"Rôle"}
                        name='role'
                        required
                        error={errors["error"]}
                        defaultOption="Veuillez choisir le rôle"
                        values={[{value:"reader",text:"lecteur"},{value:"editor",text:"éditeur"},{value:"admin",text:"administrateur"}]}
                        value={role}
                        onChange={handleChange}
                    />
                </div>

                <div className={`flex-center status ${active && "active"}`}>
                    <Label nomargin={true}>Compte</Label>
                    <FormControlLabel name='active' onClick={() => setFormFields({...formFields,active:!active})} control={<Switch checked={!!active} />} label={active ? "Activé" : "Désactivé"} />
                </div>

                <Button loading={btnLoading}>Modifier</Button>
        </form>
    </div>
  )
}

export default UpdateUser