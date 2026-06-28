import { useState } from "react";
import '../../styles/dialog.css'
import { api } from "../../services/api";

function ChangePasswordDialog({ open, onClose, person, onNotification, }) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const handleSave = async () => {
        if (newPassword !== confirmPassword) {    
            onNotification("As senhas não coincidem");
            return;
        }
        if(oldPassword !== person.senha){
            onNotification("A senha antiga não confere")
            return;
        }
        try{
            let editItem = {
                ...person,
                id: 0,
                senha: newPassword
            };
            if(person.role === "Aluno"){
                await api.put(`/Aluno/update/${person.id}`, editItem);
            }else if(person.role === "Voluntario"){
                await api.put(`/Voluntario/update/${person.id}`, editItem);
            }
            onNotification("Senha alterada com sucesso!");
            handleClose();
        } catch (err) {
            console.log(err)
            onNotification("Erro: Verifique os campos e tente novamente.")
        }
    };
    const handleClose = () => {
        setOldPassword("")
        setNewPassword("");
        setConfirmPassword("");
        onNotification(null);
        onClose();
    }

    if (!open) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog dialog-password">
                <div className="dialog-header"><h2>Alterar Senha - {person.id}</h2> <button onClick={handleClose} className="material-icons close-button">close</button></div>
                <div className="input-group" id="actual-password">
                    <label htmlFor="password">Senha atual</label>
                    <input
                        type="password"
                        placeholder="Digite sua senha atual"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>

                <div className="input-group" id="new-password">
                    <label htmlFor="newPassword">Nova senha</label>
                    <input
                        type="password"
                        placeholder="Digite sua nova senha"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="input-group" id="confirm-password">
                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input
                        type="password"
                        placeholder="Digite novamente sua nova senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button onClick={handleSave} id="btnSave">
                    Salvar
                </button>

                <button onClick={handleClose} className="button-cancel" id="btnCancel">
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default ChangePasswordDialog;