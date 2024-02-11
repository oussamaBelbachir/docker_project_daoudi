import React ,{useState} from 'react'
import "./CreateUser.styles.scss";
import FormInput from '../../../components/FormInput/FormInput.component';
import Button from '../../../components/Button/button.component';
import DirectionsNestedCheckbox from '../../../components/DirectionsNestedCheckbox/DirectionsNestedCheckbox.component';
import {createUser} from "../../../Api/users";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function CreateUser() {

    const defaultFormFields = {
        first_name : "anass",
        last_name : "kech",
        email : "anass@gmail.com",
        role : "reader",
        direction_departments : {}
    };
    const [FormFields,setFormFields] = useState(defaultFormFields);
    const [loading, setLoading] = useState(false);
    const [errors , setErrors] = useState({});
    const navigate = useNavigate();

    const {first_name, last_name, email, role, direction_departments} = FormFields;

    const handleChange = ({target :{name,value}}) => {
        console.log(name,value);
        setFormFields({...FormFields,[name]:value});
    }

    const data = JSON.parse(import.meta.env.VITE_DIRECTION_DEPARTMENTS);

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({});
        console.log(FormFields);
        
        if (Object.keys(direction_departments).length === 0) {
            toast.error(`Veuillez choisir les directions `);
            return console.log("The object is empty");
        } 
        
        setLoading(true);
        try{
            const {data} = await createUser(FormFields);
            console.log(data);
            toast.success(data.message);
            navigate("/users");

        }catch(err){
            console.log("********************************************************************");
            console.log(err);
            const {data} = err.response;
            
            if(data.status === "fail"){
                toast.error(data.message);
            }else if(data.status === "error"){
                const {message , errors} = data;
                toast.error(`${message}`);
                console.error(errors);
                setErrors(errors);
            }
          

        }

        setLoading(false);
    };

    console.log("errors ==> ",errors);

  return (
    <div className='create__user'>

        <form onSubmit={handleSubmit}>

            <div className='flex-center full'>


                <FormInput 
                    label={"Nom"}
                    placeholder=""
                    type='text'
                    name='last_name'
                    error={errors["last_name"]}
                    required
                    value={last_name}
                    onChange={handleChange}
                />    
                <FormInput 
                    label={"Prénom"}
                    placeholder=""
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

                <DirectionsNestedCheckbox data={data} directionDepartments={(value) => setFormFields({...FormFields,direction_departments:value})}/>
                
                <Button loading={loading}>Ajouter</Button>

        </form>


    </div>
  )
}

export default CreateUser






{
    cires: ["marketing", "finance"]
  };