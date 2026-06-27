import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { api } from '../../services/api';


function LoginButton( { email, password, id }) {
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        console.log("Login 1")
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
            console.log(err)
        }
        /*
        let user = {
            name: "Samuel Ribeiro",
            role: "DEVELOPER"
        };
            if (email === password) {
            user = {
                name: `Usuário ${email}`,
                role: `${email}`,
                id: `2`
            };
        }
        localStorage.setItem('auth', 'true');
        localStorage.setItem("user", JSON.stringify(user));
        navigate('/home');
        */
    }

    return (
        <button onClick={handleLogin} type='submit' id={id}>
            Entrar
        </button>
    );
}

export default LoginButton;