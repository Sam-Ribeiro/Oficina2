import { useNavigate } from 'react-router-dom';
import '../../styles/menu.css'
function Header({ onToggleNav }) {
    const navigate = useNavigate();

    function handleLogoff() {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        navigate('/login');
    }
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <header>
            <button className="material-icons" onClick={onToggleNav}>menu</button>
            <h2 className='ellp'>ELLP</h2>
            <div className="placeholder"></div>
            <div>
                <p>{user?.name}</p>
                <p>{user?.role}</p>
            </div>
            <button className="material-icons" onClick={handleLogoff}>logout</button>
        </header>
    );
}

export default Header;