import { useEffect, useState } from "react";
import { api } from "../services/api";
import '../styles/login.css'
import '../styles/theme.css'
import '../styles/common.css'
import LoginButton from "../components/LoginButton";
import ellpinho from '../assets/ellpinho_v2.png'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setSenha] = useState('');
    return (
        <div className="login-page">
            <div className="top-bg">
                <img className= "ellpinho" src={ellpinho} alt="ellpinho" />
            </div>
            <form className="login-container" 
            onSubmit={(e) => { e.preventDefault(); document.getElementById('login-btn').click();}}>
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
                    value={password}
                    onChange={(e) => setSenha(e.target.value)}

                />

                <LoginButton email={email} password={password} id="btnLogin" />
                <span>
                    Admin - Admin  |  Tutor - Tutor <br></br>
                    Professor - Professor  |  Aluno - Aluno
                </span>
            </form>
            <div className="bottom-bg"></div>
        </div>
    )
}

export default LoginPage
