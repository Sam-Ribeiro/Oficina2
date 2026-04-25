import { useNavigate } from 'react-router-dom';
import '../styles/header.css'
function Header() {
    const navigate = useNavigate();

    function handleLogoff() {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        navigate('/login');
    }
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <header>
            <span className="material-icons">menu</span>
            <h2 className='ellp'>ELLP</h2>
            <div className="placeholder"></div>
            <div>
                <p>{user?.name}</p>
                <p>{user?.role}</p>
            </div>
            <button onClick={handleLogoff}>Logoff</button>
        </header>
    );
}

export default Header;