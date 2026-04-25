import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../styles/menu.css'

function SideNav({ pageIndex, open }) {
    const navigate = useNavigate();
    function handleLogoff() {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        navigate('/login');
    }
    return (
        <nav className={`side-nav ${open ? '' : 'hidden'}`}>
            <ul>
                <li>
                    <Link className={pageIndex === 0 ? "actual-page" : ""} to="/home">
                        Home 
                        <span className="material-icons">home</span>
                    </Link>
                </li>
                <li>
                    <Link className={pageIndex === 1 ? "actual-page" : ""} to="/minhas-turmas">
                        Minhas Turmas 
                        <span className="material-icons">groups</span>
                    </Link>
                </li>
                <li>
                    <Link className={pageIndex === 2 ? "actual-page" : ""} to="/voluntarios">
                        Voluntários 
                        <span className="material-icons">volunteer_activism</span>
                    </Link>
                </li>
                <li>
                    <Link className={pageIndex === 3 ? "actual-page" : ""} to="/cursos">
                        Cursos 
                        <span className="material-icons">school</span>
                    </Link>
                </li>
                <li>
                    <Link className={pageIndex === 4 ? "actual-page" : ""} to="/turmas">
                        Turmas 
                        <span className="material-icons">class</span>
                    </Link>
                </li>
                <li>
                    <Link className={pageIndex === 5 ? "actual-page" : ""} to="/alunos">
                        Alunos 
                        <span className="material-icons">people</span>
                    </Link>
                </li>
                <li>
                    <Link className={pageIndex === 6 ? "actual-page" : ""} to="/meus-cursos">
                        Meus Cursos 
                        <span className="material-icons">library_books</span>
                    </Link>
                </li>
            </ul>
            <div className="placeholder"></div>
            <ul>
                <li onClick={handleLogoff}><a href="#">Sair<span className="material-icons">logout</span></a></li>
            </ul>
        </nav>
    )
}

export default SideNav

