import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import MinhasTurmasPage from './pages/MinhasTurmas';
import VoluntariosPage from './pages/Voluntarios';
import OficinasPage from './pages/Oficinas';
import TurmasPage from './pages/Turmas';
import AlunosPage from './pages/Alunos';
import MinhasOficinasPage from './pages/MinhasOficinas';

function App() {
  return ( 
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<Navigate to="/login" replace />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/minhas-turmas" element={<MinhasTurmasPage />} />
        <Route path="/voluntarios" element={<VoluntariosPage />} />
        <Route path="/oficinas" element={<OficinasPage />} />
        <Route path="/turmas" element={<TurmasPage />} />
        <Route path="/alunos" element={<AlunosPage />} />
        <Route path="/minhas-oficinas" element={<MinhasOficinasPage/>} />
      </Routes> 
    </BrowserRouter> 
    );
}

export default App
