import { useState } from "react";
import '../../styles/dialog.css'
import '../../styles/table.css'

function AttedanceDialog({ open, onClose, id, onNotification}) {

    const handleSave = () =>{
        onNotification("Aula concluída!")
        onClose();
    }

    const handleClose = () => {
        onNotification(null);
        onClose();
    }

    const handleAttendanceTrue = (id) => {
        setAttendanceClass(prev => ({
            ...prev,
            alunos: prev.alunos.map(aluno =>
                aluno.id === id
                    ? { ...aluno, presenca: true }
                    : aluno
            )
        }));
    };

    const handleAttendanceFalse = (id) => {
        setAttendanceClass(prev => ({
            ...prev,
            alunos: prev.alunos.map(aluno =>
                aluno.id === id
                    ? { ...aluno, presenca: false }
                    : aluno
            )
        }));
    };

    const [attendanceClass, setAttendanceClass] = useState({
        nome: "Robótica",
        data: "2026-01-14",
        alunos: [
            { id: 1, nome: "Samuel Ribeiro", presenca: false },
            { id: 2, nome: "João Silva", presenca: false },
            { id: 3, nome: "Maria Souza", presenca: false },
            { id: 4, nome: "Pedro Santos", presenca: false },
            { id: 5, nome: "Ferdinando Soares", presenca: false },
            { id: 6, nome: "Francis Alberto", presenca: false },
            { id: 7, nome: "Michal Jackson", presenca: true },
        ]
    });

    if (!open) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog dialog-class">
                <div className="dialog-header">
                    <h2>Chamada - {id} - {attendanceClass.nome} - {new Date(attendanceClass.data).toLocaleDateString("pt-Br") }</h2>
                    <button onClick={handleClose} className="material-icons close-button">close</button></div>
                <div className="attedance-table-container">  
                    <table>
                        <thead>
                            <tr>
                                <th className='small-column'>Id</th>
                                <th>Nome</th>
                                <th className='actions-column center'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceClass.alunos.length > 0 ? (
                                attendanceClass.alunos.map((a) => (
                                    <tr key={a.id} className={a.presenca === true ? "student-positive" : ""}>
                                        <td className='small-column'>{a.id}</td>
                                        <td>{a.nome}</td>
                                        <td className='actions-column center'>
                                            <button className="material-icons positive" onClick={() => handleAttendanceTrue(a.id)}>
                                                check
                                            </button>
                                            <button className="material-icons negative" onClick={() => handleAttendanceFalse(a.id)}>
                                                block
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className='center'>
                                        Nenhum registro encontrado
                                    </td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                </div>  
                <button onClick={handleSave} id='btnSave'>Salvar</button>
            </div>
        </div>
    );
}

export default AttedanceDialog;