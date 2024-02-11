import React ,{useState}from 'react'
import "./SignIn.styles.scss";
import MedImage from "../../assets/signin2.jpeg";
import FormInput from '../../components/FormInput/FormInput.component';
import Button from '../../components/Button/button.component';
import Logo from '../../components/Logo/Logo.component';
import {login} from "../../Api/auth";

import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/user/user.actions';
 
import { useSelector } from 'react-redux';
import {selectCurrentUser} from "../../store/user/user.selectors";
import { useNavigate } from 'react-router-dom';


function SignIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);


    const [loading,setLoading] = useState(false);
    const [email,setEmail] = useState("oussama0@gmail.com");
    const [password,setPassword] = useState("pass1234");
    const [error,setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try{
            const res = await login({email,password});
            const {user,token} = res.data;
            dispatch(setCurrentUser(user));
            navigate("/articles");

        }catch(err){
            console.log("==> ",err);
            const {response:{data}} = err;
            setError(data.message);
        }
        setLoading(false);

    }

  return (
    <div className='signin'>

    {/* ============================================================================= */}
        <div className='connexion__form'>
        <Logo center/>
        <h1>connexion</h1>

        {error && <div className='error'>{error}</div>}
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label={"Email"}
                    name='email'
                    required
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value)}}
                />

                <FormInput 
                    label={"Mot de passe"}
                    name='password'
                    required
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value)}}
                />
                <Button type="submit" loading={loading}>Se connecter</Button>
            </form>
            <div className='fogot__password'>Mot de passe oublié ?</div>
        </div>
    {/* ============================================================================= */}

        <div className="right"  style={{ backgroundImage: `url(${MedImage})` }}>
             
        </div>
    </div>
  )
}

export default SignIn