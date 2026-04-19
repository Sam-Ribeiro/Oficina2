import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

function App() {
  return ( 
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<Navigate to="/login" replace />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/home" element={<HomePage />} /> 
      </Routes> 
    </BrowserRouter> 
    );
}

export default App
