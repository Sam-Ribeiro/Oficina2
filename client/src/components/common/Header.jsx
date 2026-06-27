import { useNavigate } from 'react-router-dom';
import '../../styles/menu.css'
import { jwtDecode } from "jwt-decode";
    
function Header({ onToggleNav }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const user = jwtDecode(token);
    console.log(user)
    function handleLogoff() {
        navigate('/login');
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        
    }
    const horas = 2 * 59 * 59 * 1000;
    const expirou = user.exp * 1000 < Date.now() + horas;

    console.log(user.exp * 1000)
    console.log(Date.now() + horas)

    if(expirou){
        handleLogoff()
    }

    return (
        <header>
            <button className="material-icons" onClick={onToggleNav}>menu</button>
            <h2 className='ellp'>ELLP</h2>
            <div className="placeholder"></div>
            <div>
                <p>{user?.Nome}</p>
                <p>{user?.role}</p>
            </div>
            <button className="material-icons" onClick={handleLogoff}>logout</button>
        </header>
    );
}

export default Header;