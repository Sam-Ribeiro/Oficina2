import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();

  function handleLogin() {
    localStorage.setItem('auth', 'true');
    navigate('/home');
  }

  return (
    <button onClick={handleLogin}>
      Entrar
    </button>
  );
}

export default LoginButton;