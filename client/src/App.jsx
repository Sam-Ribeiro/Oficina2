import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import MinhasTurmasPage from './pages/MinhasTurmas';
import VoluntariosPage from './pages/Voluntarios';
import CursosPage from './pages/Cursos';
import TurmasPage from './pages/Turmas';
import AlunosPage from './pages/Alunos';
import MeusCursosPage from './pages/MeusCursos';

function App() {
  return ( 
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<Navigate to="/login" replace />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/minhas-turmas" element={<MinhasTurmasPage />} />
        <Route path="/voluntarios" element={<VoluntariosPage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/turmas" element={<TurmasPage />} />
        <Route path="/alunos" element={<AlunosPage />} />
        <Route path="/meus-cursos" element={<MeusCursosPage />} />
      </Routes> 
    </BrowserRouter> 
    );
}

export default App
