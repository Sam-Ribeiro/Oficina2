import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();

  function handleLogin() {
    localStorage.setItem('auth', 'true');
    const user = {
      name: "Samuel Ribeiro",
      role: "Professor"
    };

    localStorage.setItem("user", JSON.stringify(user));

    navigate('/home');
  }

  return (
    <button onClick={handleLogin}>
      Entrar
    </button>
  );
}

export default LoginButton;