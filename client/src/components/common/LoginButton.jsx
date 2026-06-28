import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { api } from '../../services/api';


function LoginButton( { email, password, id }) {
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        try{
            let user = {
                login: email,
                senha: password
            }
            const res = await api.post("/Auth/login", user)
            localStorage.setItem("token", res.data.token)
            localStorage.setItem('auth', 'true');
            navigate('/home');
        } catch (err) {
            console.log(err.data)
        }
    }

    return (
        <button onClick={handleLogin} type='submit' id={id}>
            Entrar
        </button>
    );
}

export default LoginButton;