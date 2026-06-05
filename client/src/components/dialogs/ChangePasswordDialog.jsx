import { useState } from "react";
import '../../styles/dialog.css'

function ChangePasswordDialog({ open, onClose, id, onNotification }) {
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleSave = () => {
        
        if (newPassword !== confirmPassword) {    
            onNotification("As senhas não coincidem");
            return;
        }
        setNewPassword("");
        setConfirmPassword("");
        onNotification("Senha alterada com sucesso!");
        onClose();
    };
    const handleClose = () => {
        setNewPassword("");
        setConfirmPassword("");
        onNotification(null);
        onClose();
    }

    if (!open) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog dialog-password">
                <div className="dialog-header"><h2>Alterar Senha - {id}</h2> <button onClick={handleClose} className="material-icons close-button">close</button></div>
                <div className="input-group" id="actual-password">
                    <label htmlFor="password">Senha atual</label>
                    <input
                        type="password"
                        placeholder="Digite sua senha atual"
                    />
                    <span className="error-message">A senha atual não está correta!</span>
                </div>

                <div className="input-group" id="new-password">
                    <label htmlFor="newPassword">Nova senha</label>
                    <input
                        type="password"
                        placeholder="Digite sua nova senha"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span className="error-message">A nova senha deve ter pelo menos 6 caracteres!</span>
                </div>

                <div className="input-group" id="confirm-password">
                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input
                        type="password"
                        placeholder="Digite novamente sua nova senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="error-message">As senhas não coincidem!</span>
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