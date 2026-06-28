import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../../styles/menu.css';
import { jwtDecode } from "jwt-decode";

function Header({ onToggleNav }) {
    const navigate = useNavigate();

    function handleLogoff() {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        navigate('/login');
    }

    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : null;

    useEffect(() => {
        if (!user) {
            handleLogoff();
            return;
        }

        if (user.exp * 1000 < Date.now()) {
            handleLogoff();
        }
    }, []);

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