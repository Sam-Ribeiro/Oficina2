import { useState, useEffect } from "react";
import '../../styles/dialog.css'
import '../../styles/table.css'
import { api } from "../../services/api";

function AttedanceDialog({ open, onClose, id, onNotification}) {

    const handleSave = () =>{
        onNotification("Aula concluída!")
        onClose();
    }

    const handleClose = () => {
        onNotification(null);
        onClose();
    }

    const handleAttendanceTrue = async (presenca) => {
        console.log(presenca);
        try {
            await api.put(`/Presenca/update/${presenca.id}`, {
                aulaId: presenca.aulaId,
                alunoId: presenca.alunoId,
                presente: true
            });

            setAttendanceClass(prev =>
                prev.map(item =>
                    item.id === presenca.id
                        ? { ...item, presente: true }
                        : item
                )
            );
        } catch (err) {
            console.error(err);
            onNotification("Erro ao atualizar presença.");
        }
    };

    const handleAttendanceFalse = async (presenca) => {
        try {
            await api.put(`/Presenca/update/${presenca.id}`, {
                aulaId: presenca.aulaId,
                alunoId: presenca.alunoId,
                presente: false
            });

            setAttendanceClass(prev =>
                prev.map(item =>
                    item.id === presenca.id
                        ? { ...item, presente: false }
                        : item
                )
            );
        } catch (err) {
            console.error(err);
            onNotification("Erro ao atualizar presença.");
        }
    };

    const [attendanceClass, setAttendanceClass] = useState([])
    const fetchItems = async () => {
        try {
            const res = await api.get(`/Presenca?aulaId=${id}`);
            setAttendanceClass(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    
    useEffect(() => {
        if (!open) return;

        fetchItems();
    }, [open]);

    if (!open) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog dialog-class">
                <div className="dialog-header">
                    <h2>Chamada - {id}</h2>
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
                            {attendanceClass.length > 0 ? (
                                attendanceClass.map((a) => (
                                    <tr key={a.id} className={a.presente === true ? "student-positive" : ""}>
                                        <td className='small-column'>{a.id}</td>
                                        <td>{a.aluno.nome}</td>
                                        <td className='actions-column center'>
                                            <button className="material-icons positive" onClick={() => handleAttendanceTrue(a)}>
                                                check
                                            </button>
                                            <button className="material-icons negative" onClick={() => handleAttendanceFalse(a)}>
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