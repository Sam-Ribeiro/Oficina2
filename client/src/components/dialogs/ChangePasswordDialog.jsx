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
                <h2>Alterar Senha - {id}</h2>

                <input
                    type="password"
                    placeholder="Senha atual"
                />

                <input
                    type="password"
                    placeholder="Nova senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button onClick={handleSave}>
                    Salvar
                </button>

                <button onClick={handleClose} className="button-cancel">
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default ChangePasswordDialog;