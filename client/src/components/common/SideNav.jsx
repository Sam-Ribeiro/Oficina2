import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../../styles/menu.css'
import { jwtDecode } from "jwt-decode";

function SideNav({ pageIndex, open }) {
    const navigate = useNavigate();
    function handleLogoff() {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        navigate('/login');
    }
    const token = localStorage.getItem("token");

    const user = jwtDecode(token);
    return (
        <nav className={`side-nav ${open ? '' : 'hidden'}`}>
            <ul>
                <li>
                    <Link className={`${pageIndex === 0 ? "actual-page" : ""} 
                    ${user.role === "DEVELOPER" || user.role === "Admin" || user.role === "Professor" || user.role === "Aluno" || user.role === "Voluntario" ? "" : "none"}`}
                     to="/home">
                        Home 
                        <span className="material-icons">home</span>
                    </Link>
                </li>
                <li>
                    <Link className={`${pageIndex === 1 ? "actual-page" : ""} 
                    ${user.role === "DEVELOPER" || user.role === "Admin" || user.role === "Professor" || user.role === "Voluntario" ? "" : "none"}`} 
                    to="/minhas-turmas">
                        Minhas Turmas 
                        <span className="material-icons">groups</span>
                    </Link>
                </li>
                <li>
                    <Link className={`${pageIndex === 2 ? "actual-page" : ""} 
                    ${user.role === "DEVELOPER" || user.role === "Admin" || user.role === "Voluntario" ? "" : "none"}`} 
                    to="/voluntarios">
                        Voluntários 
                        <span className="material-icons">volunteer_activism</span>
                    </Link>
                </li>
                <li>
                    <Link className={`${pageIndex === 3 ? "actual-page" : ""} 
                    ${user.role === "DEVELOPER" || user.role === "Admin" || user.role === "Professor" || user.role === "Voluntario" ? "" : "none"}`} 
                    to="/oficinas">
                        Oficinas 
                        <span className="material-icons">library_books</span>
                    </Link>
                </li>
                <li>
                    <Link className={`${pageIndex === 4 ? "actual-page" : ""} 
                    ${user.role === "DEVELOPER" || user.role === "Admin" || user.role === "Professor" || user.role === "Voluntario" ? "" : "none"}`} 
                    to="/turmas">
                        Turmas 
                        <span className="material-icons">class</span>
                    </Link>
                </li>
                <li>
                    <Link className={`${pageIndex === 5 ? "actual-page" : ""} 
                    ${user.role === "DEVELOPER" || user.role === "Admin" || user.role === "Professor" || user.role === "Voluntario" ? "" : "none"}`} 
                    to="/alunos">
                        Alunos 
                        <span className="material-icons">people</span>
                    </Link>
                </li>
                {/* 
                < li > 
                    <Link className={`${pageIndex === 6 ? "actual-page" : ""} 
                    ${user.role === "DEVELOPER" || user.role === "Aluno" ? "" : "none"}`} to="/minhas-oficinas">
                        Minhas Oficinas 
                        <span className="material-icons">library_books</span>
                    </Link>
                </li >
                */}

            </ul>
            <div className="placeholder"></div>
            <ul>
                <li onClick={handleLogoff}><a href="#">Sair<span className="material-icons">logout</span></a></li>
            </ul>
        </nav>
    )
}

export default SideNav

