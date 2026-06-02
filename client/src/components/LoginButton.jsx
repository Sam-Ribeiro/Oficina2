import { useNavigate } from 'react-router-dom';

function LoginButton( { email, password, id }) {
    const navigate = useNavigate();

    function handleLogin() {
    
        let user = {
            name: "Samuel Ribeiro",
            role: "DEVELOPER"
        };
            if (email === password) {
            user = {
                name: `Usuário ${email}`,
                role: `${email}`
            };
        }
        localStorage.setItem('auth', 'true');
        localStorage.setItem("user", JSON.stringify(user));
        navigate('/home');
    }

    return (
        <button onClick={handleLogin} type='submit' id={id}>
            Entrar
        </button>
    );
}

export default LoginButton;