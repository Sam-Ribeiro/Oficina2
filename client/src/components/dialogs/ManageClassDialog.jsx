import { useState } from "react";
import '../../styles/dialog.css'

function ManageClassDialog({ open, onClose, id, onNotification, classes }) {

    const handleClose = () => {
        onNotification(null);
        onClose();
    }

    if (!open) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog dialog-class">
                <div className="dialog-header"><h2>Gerenciar Aulas - {id}</h2> <button onClick={handleClose} className="material-icons close-button">close</button></div>
                <h3>
                    Aulas cadastradas
                </h3>
                <div className="classes-list-cotainer">
                    <ul className="classes-list">
                        {classes.length > 0 ? (
                            classes.map((c) => (
                                <li key={c.id} className={c.status === "Concluído" ? "class-done" : ""} >{new Date(c.data).toLocaleDateString("pt-BR")}</li>
                            ))
                        ) : (
                            <p>Nenhuma aula cadastrada.</p>
                        )}
                        <li className="add-class">
                            Adicionar Aula +
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ManageClassDialog;