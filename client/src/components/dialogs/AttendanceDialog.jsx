import { useState } from "react";
import '../../styles/dialog.css'

function AttedanceDialog({ open, onClose, id, onNotification, classes }) {

    const handleSave = () =>{
        onNotification("Aula concluída!")
        onClose();
    }

    const handleClose = () => {
        onNotification(null);
        onClose();
    }
    const [attendanceClass, setAttendanceClass] = useState({
        nome: "Robótica",
        data: "2026-01-14",
        alunos: [
            { id: 1, nome: "Samuel Ribeiro", presenca: true },
            { id: 2, nome: "João Silva", presenca: false },
            { id: 3, nome: "Maria Souza", presenca: true },
            { id: 4, nome: "Pedro Santos", presenca: null }
        ]
    });

    if (!open) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog dialog-class">
                <div className="dialog-header">
                    <h2>Chamada - {attendanceClass.nome} - {new Date(attendanceClass.data).toLocaleDateString("pt-Br") }</h2>
                    <button onClick={handleClose} className="material-icons close-button">close</button></div>
                <h3>
                    Aulas cadastradas
                </h3>
                
                <button onClick={handleSave} id='btnSave'>Salvar</button>
            </div>
        </div>
    );
}

export default AttedanceDialog;