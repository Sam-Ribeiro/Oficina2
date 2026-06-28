import { useEffect, useState } from "react";
import { api } from "../services/api";
import '../styles/login.css'
import '../styles/theme.css'
import '../styles/common.css'
import LoginButton from "../components/common/LoginButton";
import ellpinho from '../assets/ellpinho_v2.png'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setSenha] = useState('');
    return (
        <div className="login-page">
            <form className="login-container" 
            onSubmit={(e) => { e.preventDefault(); document.getElementById('login-btn').click();}}>
                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="campoEmail"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setSenha(e.target.value)}
                    id="campoSenha"
                />

                <LoginButton email={email} password={password} id="btnLogin" />
                
            </form>
            <div className="bottom-bg"> <img className= "ellpinho" src={ellpinho} alt="ellpinho" /></div>
        </div>
    )
}

export default LoginPage
