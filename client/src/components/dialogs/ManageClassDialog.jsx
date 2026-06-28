import { useState, useEffect } from "react";
import '../../styles/dialog.css'
import AttedanceDialog from "./AttendanceDialog";
import { api } from "../../services/api";

function ManageClassDialog({ open, onClose, id, onNotification, turma }) {
    const handleClose = () => {
        onNotification(null);
        onClose();
    }

    const setNotification = (n) =>{
        onNotification(n)
    }
    
    const [classDate, setClassDate] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [openAttendanceDialog, setOpenAttendanceDialog] = useState(false);
    const [classes, setClasses] = useState([]);

    const fetchClasses = async () => {
        try {
            const res = await api.get(`/Aula?turmaId=${turma.id}`);
            setClasses(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    
    useEffect(() => {
        if (!open) return;

        fetchClasses();
    }, [open, turma]);

    const handleSave = async () =>{
        try{
            let novaAula = {
                tema: "aula",
                dataHora: classDate,
                status: "status",
                turmaId: turma.id
            }
            const res = await api.post("/Aula/create", novaAula)
            onNotification("Aula cadastrada com sucesso!");
        } catch (err) {
            console.log(err)
            onNotification("Erro: Verifique os campos e tente novamente.")
        }
        fetchClasses()
    }

    const handleDownload = async () => {
        try {
            const res = await api.get(`/Turma/TodosCertificados/${turma.id}`, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(res.data);

            const link = document.createElement("a");
            link.href = url;
            link.download = `Certificados_Turma_${turma.id}.zip`;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.log(err);
            onNotification("Erro ao carregar certificados.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/Aula/delete/${id}`);
            onNotification("Aula removida com sucesso!");

            fetchClasses();
        } catch (err) {
            console.log(err);
            onNotification("Erro ao remover aula.");
        }
    };

    if (!open) return null;
    
    return (
        <div className="dialog-overlay">
            <div className="dialog dialog-class">
                <div className="dialog-header">
                    <h2>
                        Gerenciar Aulas - {turma.id} - {turma.oficina.nome} <br/> 
                        {new Date(turma.dataInicio).toLocaleDateString("pt-BR") } até {new Date(turma.dataTermino).toLocaleDateString("pt-BR")}
                    </h2> 
                     <button className="material-icons" 
                        onClick={() => { handleDownload(turma.id)}}>
                        download
                    </button>
                    <button onClick={handleClose} className="material-icons close-button">close</button>
                </div>
                <h3>
                    Aulas cadastradas
                </h3>
                <div className="classes-list-cotainer">
                    <ul className="classes-list">
                        {classes.length > 0 ? (
                            classes.map((c) => (
                                <li 
                                key={c.id} className={c.status === "Concluído" ? "class-done" : ""}
                                onClick={ () => { setSelectedItem(c.id); setOpenAttendanceDialog(true);}
                                }
                                >
                                        {new Date(c.dataHora).toLocaleDateString("pt-BR")}
                                        <button
                                            className="material-icons delete-class"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(c.id);
                                            }}
                                        >
                                            delete
                                        </button>
                                </li>
                            ))
                        ) : (
                            <p>Nenhuma aula cadastrada.</p>
                        )}
                        <li className="add-class" onClick={handleSave}>
                            Adicionar Aula +
                            <input
                                id="dataAula"
                                type="date"
                                value={classDate}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    setClassDate(e.target.value);
                                }}
                                min={turma.dataInicio?.split("T")[0]}
                                max={turma.dataTermino?.split("T")[0]}
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <AttedanceDialog classes={classes} onNotification={(n) =>setNotification(n)} open={openAttendanceDialog} id={selectedItem} onClose={() =>{setSelectedItem(null); setOpenAttendanceDialog(false);}}/>
        </div>
    );
}

export default ManageClassDialog;