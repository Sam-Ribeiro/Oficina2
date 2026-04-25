import { useEffect, useState } from "react";
import { api } from "../services/api";
import '../styles/login.css'
import '../styles/theme.css'
import '../styles/common.css'
import LoginButton from "../components/LoginButton";
import ellpinho from '../assets/ellpinho_v2.png'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    return (
        <div className="login-page">
            <div className="top-bg">
                <img className= "ellpinho" src={ellpinho} alt="ellpinho" />
            </div>
            <div className="login-container">
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />

            <LoginButton />
            </div>
            <div className="bottom-bg"></div>
        </div>
    )
}

export default LoginPage
